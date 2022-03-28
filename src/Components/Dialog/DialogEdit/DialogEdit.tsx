import ContactsStore from "../../../Stores/ContactsStore";
import DialogFormStore from "../../../Stores/DialogFormStore";

import { observer } from "mobx-react-lite"

import c from "./dialogedit.module.scss"
import React, { useEffect } from "react";
import { TextInput } from "../TextInput";
import { SelectInput } from "../SelectInput";

interface IProps {
    id: string;
}

const DialogEdit = (props: IProps) => {
    const {id} = props;

    useEffect(()=>{
        id && DialogFormStore.getDataFromServer(id)
        
        return () => {
            DialogFormStore.deInit();
        }
    }, [id])

    const onConfirm = () => {
        DialogFormStore.submitForm();
    }

    const onAbort = () => {
        ContactsStore.closeDialogEdit();
    }

    return (
        <div className={c.wrapper}>
            <h4 className={c.caption}>{(id) ? "Изменить клиента" : "Новый клиент"}</h4>

            <div className={c.form}>
                <TextInput
                    id="surname"
                    labelText="Фамилия"
                    validateModel={DialogFormStore}
                    validateProp={"surname"}
                    value={DialogFormStore.surname}
                    onChange={DialogFormStore.onChangeSurname}
                />
                <TextInput
                    id="name"
                    labelText="Имя"
                    validateModel={DialogFormStore}
                    validateProp={"name"}
                    value={DialogFormStore.name}
                    onChange={DialogFormStore.onChangeName}
                />
                <TextInput
                    id="lastName"
                    labelText="Отчество"
                    validateModel={DialogFormStore}
                    validateProp={"lastName"}
                    value={DialogFormStore.lastName}
                    onChange={DialogFormStore.onChangeLastName}
                />
                
                <div className={c.contacts_wrapper}>
                    {DialogFormStore.contacts?.map((item, index) => {
                            return (
                                <SelectInput
                                    key={index}
                                    index={index}
                                    type={item.type}
                                    value={item.value}
                                    onChangeType={DialogFormStore.onChangeContactType}
                                    onChangeValue={DialogFormStore.onChangeContactValue}
                                    onDeleteContact={DialogFormStore.onDeleteContact}
                                />
                            )
                        })
                    }

                    {(!id || DialogFormStore.contacts?.length < 10) && 
                        <button className={c.add_contact} onClick={DialogFormStore.onAddContact}>
                            Добавить контакт
                            </button>}
                </div>

                <button className={c.confirm_button} onClick={onConfirm}>{(id) ? "Изменить" : "Сохранить"}</button>
                <button className={c.cancel_button} onClick={onAbort}>Отмена</button>
            </div>


        </div>
    )
}

export default observer(DialogEdit);
