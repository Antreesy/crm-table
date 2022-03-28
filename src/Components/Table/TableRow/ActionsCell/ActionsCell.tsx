import ContactsStore from "../../../../Stores/ContactsStore";

import c from "./actionscell.module.scss"

interface IProps {
    id: string;
}

const ActionsCell = (props: IProps) => {
    const {id} = props;

    const onEdit = () => {
        ContactsStore.openDialogEdit(id);
    }
    
    const onDelete = () => {
        ContactsStore.openDialogDelete(id);
    }
    
    return (
        <div className={c.btn_wrap}>
            <button className={c.btn_edit} onClick={onEdit}>Изменить</button>
            <button className={c.btn_delete} onClick={onDelete}>Удалить</button>
        </div>
    );
}

export default ActionsCell