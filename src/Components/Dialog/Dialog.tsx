import c from "./dialog.module.scss"

interface IProps {
    children: JSX.Element | null;
}

const Dialog = ({children} : IProps) => {

    return (
        <div className={c.modal}>
            <div className={c.scrollContainer}>
                <div className={c.dialog}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dialog;