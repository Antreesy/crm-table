import { useEffect } from 'react'

import { observer } from "mobx-react-lite"

import {TableHeader} from './TableHeader'
import {TableBody} from './TableBody'
import ContactsStore from '../../Stores/ContactsStore'

import c from "./table.module.scss"

const Table = () => {
    useEffect(() => {
        ContactsStore.getDataFromServer();
    
        return () => {
          ContactsStore.deInit();
        };
      }, []);

    return (
        <table className={c.table}>
            <TableHeader />
            <TableBody data={ContactsStore.data}/>
        </table>
    );
}

export default observer(Table);