import { Dialog } from "../../Components/Dialog";
import {DialogDelete} from "../../Components/Dialog/DialogDelete";
import {DialogEdit} from "../../Components/Dialog/DialogEdit";
import {Table} from "../../Components/Table"
import ContactsStore from "../../Stores/ContactsStore";

import { observer } from "mobx-react-lite"

import c from "./mainpage.module.scss"

const MainPage = () => {
  const renderModal = () => {
    if (ContactsStore.isShowDialogDelete) return <DialogDelete id={ContactsStore.currentId} />
    if (ContactsStore.isShowDialogEdit) return <DialogEdit id={ContactsStore.currentId} />
    
    return null;
  }
  
  const handleClick = () => {
    ContactsStore.openDialogEdit(null);
  }

  return (
  <main className={c.container}>
    <h3>Клиенты</h3>
    <Table />
    <div className={c.btnWrapper}>
      <button className={c.addBtn} onClick={handleClick}>Добавить клиента</button>
    </div>
    {ContactsStore.isShowModal && <Dialog>
      {renderModal()}
      </Dialog>
    }
    
  </main> );
}

export default observer(MainPage);