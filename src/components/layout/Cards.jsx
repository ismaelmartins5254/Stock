import Style from './Cards.module.css'
import Button from '../form/Button'

function Cards({ name, description, value, valueT, type, quant, ButtonDelIten, ButtonEditIten, id}) {


  return (
    <div className={Style.container}>
      <section className={Style.cards} id={id} key={id}>
        <h3>{name}</h3>
        <p>Descrição do item: <span>{description}</span> </p>
        <p>Valor Unitário: {value}</p>
        <p>Quantidade: {quant}</p>
        <p>Valor Total: {valueT}</p>
        <p>Setor do item: {type}</p>
        <div className={Style.btns}>
          <div className={Style.edit}>
            <Button
              text={
                <>
                  <span>Editar</span>
                  <span
                    className="material-symbols-outlined ">
                    edit
                  </span>
                </>}
              onclick={ButtonEditIten}
            />
          </div>
          <div className={Style.exl}>
            <Button
              text={<>
                <span>Excluir</span>
                <span className="material-symbols-outlined">
                  delete
                </span>
              </>}
              onclick={ButtonDelIten}
            />
          </div>
        </div>
      </section>
    </div >
  )
}

export default Cards