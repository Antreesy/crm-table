import { TableRow } from "../TableRow";

import c from "./tablebody.module.scss" 

import {IInformationDto} from "../../../Interfaces/IContactsDto"

const TableBody = (props: IInformationDto) => {
    const {data} = props;
    return (
        <tbody className={c.tableBody} >
            {data.map((item, index) => {
                return <TableRow key={index} data={item} />
            })}
        </tbody>
    );
}

  export default TableBody;