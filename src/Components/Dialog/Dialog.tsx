import c from "./dialog.module.scss"

interface IProps {
    children: JSX.Element | null;
}

const Dialog = ({children} : IProps) => {

    return (
        <div className={c.modal}>
            <div className={c.dialog}>
                {children}
            </div>
        </div>
    )
}

export default Dialog;