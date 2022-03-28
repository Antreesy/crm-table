import { useState } from "react";

import SelectItem from "./SelectItem/SelectItem";

import {choises} from "../../../../Shared/const/const"

import c from "./select.module.scss"

interface ISelectProps {
    index: number;
    type: string;
    onChangeType: (index: number, type:string) => void;
}

const Select = (props: ISelectProps) => {
    const {index, type, onChangeType} = props;
    
    const [open, setOpen] = useState<boolean>(false)
    const [btnId, setBtnId] = useState<number>(choises.find((item) => item.type === type)?.id || 0)

    const handleClick = () => {
        setOpen(!open)
    }

    const onChangeSelect = (id: number) => {
        setBtnId(id)
        setOpen(false)
        onChangeType(index, choises[id].type)
    }

    return (
        <div className={c.select_wrapper}>
            <button 
                className={`${c.select_preview} ${open && c.openpreview}`}
                onClick={handleClick}
            >
                {choises[btnId].name}
            </button>
            {open && 
                <ul className={c.dropdown}>
                    {choises.map((item) => {
                        if (item.id === btnId) return null;
                    return <SelectItem id={item.id} onClick={onChangeSelect} />
                    })}     
                </ul>
            }
        </div>
    )

}

export default Select;