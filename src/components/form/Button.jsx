import Style from './Button.module.css'

function Button({ onclick, text }) {
    return (
        <>
            <button onClick={onclick} className={Style.btn}>{text}</button>
        </>
    )
}

export default Button