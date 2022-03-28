import { ChangeEvent } from "react";

import {Select} from "./Select"

import c from "./selectinput.module.scss"

interface ISelectInput {
    index: number;
    type: string;
    value: string;
    onChangeType: (index: number, type: string) => void;
    onChangeValue: (index: number, value: string) => void;
    onDeleteContact: (index: number) => void;
}

const SelectInput = (props: ISelectInput) => {
    const {index, type, value, onChangeType, onChangeValue, onDeleteContact} = props;

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChangeValue(index, value);
    }

    const handleDelete = () => {
        onDeleteContact(index);
    }

    return (
        <div className={c.wrapper}>
            <Select index={index} type={type} onChangeType={onChangeType} />
            <input className={c.input} value={value} onChange={handleChangeValue} type="text" placeholder="Введите контакт" />
            <button className={c.cancel_btn} onClick={handleDelete} />
        </div>
    )
}

export default SelectInput