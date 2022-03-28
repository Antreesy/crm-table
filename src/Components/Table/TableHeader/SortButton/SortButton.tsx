import { useState } from "react";
import Utils from "../../../../Methods/Utils";
import ContactsStore from "../../../../Stores/ContactsStore";
import c from "./sortbutton.module.scss"

interface IProps {
    name: string;
    isSortable: boolean;
}

const SortButton = (props: IProps) => {
    const {name, isSortable} = props;
    const [sorted, setSorted] = useState<"" | "asc" | "desc">("")

    const onClick = () => {
        if (!isSortable) return;

        switch (sorted) {
          case "": {
            setSorted("asc");
            break;
          }
          case "asc": {
            setSorted("desc");
            break;
          }
          case "desc": {
            setSorted("");
            break;
          }
        }

        ContactsStore.sortData(name, sorted)
    }

  return (
    <button className={`${c.sortButton} ${c[`${sorted}`]}`} onClick={onClick} >
        
    </button>
  )
}

  export default SortButton;