import ContactsStore from "../../Stores/ContactsStore";
import c from "./search.module.scss"

const Search = () => {
    let timeDelay: NodeJS.Timeout;

    const handleChange = (e: any) => {
        const value = e.target.value;
        clearTimeout(timeDelay);

        timeDelay = setTimeout(()=>{
            ContactsStore.getDataFromServer(value)
        }, 1500)
    }

    return <input className={c.search} type="text" placeholder="Поиск..." onChange={handleChange} />
}

export default Search;