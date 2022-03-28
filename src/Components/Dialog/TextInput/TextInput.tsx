import { observer } from "mobx-react";
import { IValidateFormModel } from "../../../Interfaces/IValidateFormModel";
import Validation from "../../../Methods/Validation";
import c from "./textinput.module.scss"

interface IProps {
    id: string;
    labelText: string;
    validateModel?: IValidateFormModel;
    validateProp?: string;
    value: string;
    onChange: (value: string) => void;
}

const TextInput = (props: IProps) => {
    const {id, labelText, validateModel, validateProp, value, onChange} = props;

    let isRequired = false;
    let isError = false;
    let validateMsg = "";
    
    const validateValue = () => {
        if (!validateModel || !validateProp) return;

        const validation = new Validation(validateModel.validRules[validateProp], value);

        isRequired = validation.isRequired;

        if (validateModel.isValid === null) return;

        isError = !validateModel.validField[validateProp];
        validateMsg = validation.checkRules();
    };
     validateValue();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value)
    }

    return (
        <label className={c.label}>
            <div className={c.wrapper}>
                <span className={c.caption}>{labelText}</span>
                {" "}
                {isRequired && <span className={c.error}>*</span>}
                {" "}
                {isError && <span className={c.error}>{validateMsg}</span>}
            </div>
            <input
                className={c.input}
                type="text"
                name={id}
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={labelText}
            />
        </label>
    )
}

export default observer(TextInput);