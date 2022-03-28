import {ContactsCell} from "./ContactsCell";
import {ActionsCell} from "./ActionsCell";

import c from "./tablerow.module.scss"

interface IProps {
  data: {
  id: string,
  createdAt: string,
  updatedAt: string,

  name: string,
  surname: string,
  lastName: string,

  contacts: {
      type: string;
      value: string;
    }[];
  }
}


const TableRow = (props: IProps) => {
  const {data} = props;

  const createdDate = new Date(data.createdAt).toLocaleDateString('ru-RU', {day: '2-digit', month:'2-digit', year:'numeric'})
  const createdTime = new Date(data.createdAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})

  const updatedDate = new Date(data.updatedAt).toLocaleDateString('ru-RU', {day: '2-digit', month:'2-digit', year:'numeric'})
  const updatedTime = new Date(data.updatedAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})

  
  return (
    <tr className={c.row}>
      <td className={c.column}><span className={c.column_id}>{data.id}</span></td>
      <td className={c.column}><span>{data.surname} {data.name} {data.lastName}</span></td>
      <td className={c.column}><span>{createdDate}</span>  <span className={c.text_time}>{createdTime}</span></td>
      <td className={`${c.column} ${c.column_time}`}><span>{updatedDate}</span>  <span className={c.text_time}>{updatedTime}</span></td>
      <td className={c.column}><ContactsCell contacts={data.contacts} /></td>
      <td className={c.column}><ActionsCell id={data.id} /></td>
    </tr>
  );
  }

  export default TableRow;