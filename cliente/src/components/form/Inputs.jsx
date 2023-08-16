import Style from './Inputs.module.css'

function Inputs({ type, place, change, id, ValueLabel, value }) {
    return (
        <>
            <label htmlFor={id}>{ValueLabel}</label>
            <input type={type} placeholder={`Digite aqui ${place}`} className={Style.input} onChange={change} id={id} name={id} defaultValue={value? value : ''} min='0' />
        </>
    )
}

export default Inputs