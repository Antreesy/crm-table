import { MouseEvent } from "react";

import {choises} from "../../../../../Shared/const/const"
import c from "./select.module.scss"

interface IProps {
    id: number;
    onClick: (id: number) => void;
}

const SelectItem = (props: IProps) => {
    const {id, onClick} = props;
    const name = choises[id].name;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        onClick(id);
    }

    return (
        <li key={id} className={c.item}>
            <button className={c.item_btn} onClick={handleClick}>{name}</button>
        </li>
    )
}

export default SelectItem;