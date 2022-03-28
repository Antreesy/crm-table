
import c from "./contactscell.module.scss"

interface IProps {
    contacts: {
        type: string;
        value: string;
    }[]
}

const ContactsCell = (props: IProps) => {
    const ContactsArray = () => {
        return <>
        {props.contacts.map((item, index) => {
            const btnClassName = `btn__contact-${item.type}`

            return (
                <button key={index} className={`${c.btn} ${c[`${btnClassName}`]}`}>
                    <div className={c.tooltip}>
                        <span>{item.value}</span>
                    </div>
                </button>
            )
        })}
        </>
    }

    return (
        <div className={c.btn_wrap}>
            <ContactsArray />
        </div>
    );
}

export default ContactsCell;