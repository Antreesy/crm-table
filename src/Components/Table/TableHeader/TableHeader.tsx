import {SortButton} from "./SortButton"
import c from "./tablehead.module.scss"

const TableHeader = () => {

  const headContent = [ 
    {name:"id", content: "ID", isSortable: true}, 
    {name:"fullname", content: "Фамилия Имя Отчество", isSortable: true}, 
    {name:"createdAt", content: "Дата и время создания", isSortable: true}, 
    {name:"updatedAt", content: "Последние изменения", isSortable: true}, 
    {name:"contacts", content: "Контакты", isSortable: false}, 
    {name:"actions", content: "Действия", isSortable: false},
  ]

  return (
    <thead className={c.tableHead}>
      <tr>
        {headContent.map((item, index) => {
          return <th key={index} className={c.column}>
            <div className={c.column__wrapper}>
              <span>{item.content}</span>
              <SortButton name={item.name} isSortable={item.isSortable} />

            </div>
          </th>
        })}
      </tr>
    </thead>
  )
}

export default TableHeader;