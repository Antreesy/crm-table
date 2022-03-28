import ContactsStore from "../../../Stores/ContactsStore";

import { observer } from "mobx-react-lite"

import c from "./dialogdelete.module.scss"

interface IProps {
    id: string;
}

const DialogDelete = (props: IProps) => {

    const onDelete = () => {
        ContactsStore.removeItemById(props.id);
        ContactsStore.closeDialogDelete();
    }

    const onAbort = () => {
        ContactsStore.closeDialogDelete();
    }

    return (
        <div className={c.wrapper}>
            <h4 className={c.caption}>Удалить клиента</h4>

            <p className={c.text}>Вы действительно хотите удалить данного клиента?</p>

            <button className={c.confirm_button} onClick={onDelete}>Удалить</button>
            <button className={c.cancel_button} onClick={onAbort}>Отмена</button>

        </div>
    )
}

export default observer(DialogDelete)