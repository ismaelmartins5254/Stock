import Style from './Inputs.module.css'

function Inputs({ type, place, change, id, ValueLabel, value }) {
    return (
        <>
            <label htmlFor={id}>{ValueLabel}</label>
            <input type={type} placeholder={place} className={Style.input} onChange={change} id={id} name={id} value={value? value : ''} />
        </>
    )
}

export default Inputs