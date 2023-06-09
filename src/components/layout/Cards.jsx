import { useState } from 'react'

import Style from './Cards.module.css'
import Button from '../form/Button'
import Message from './Message'


function Cards({ name, description, value, valueT, type, quant, ButtonEditIten, id, location }) {

  let [message, setMessage] = useState(false)
  let [messageText, setMessageText] = useState('')
  let [typeM, setTypeM] = useState('')

  const DelIten = async (e) => { //sistema para deletar o item desejado
    e.preventDefault()
    let iten = e.target //seleciona o item que Efetuou o evento DOM
    let parent = iten.closest('section') //procura o 'pai' na arvore do codigo
    let res = await fetch(`https://server-stock-j6wli97bb-ismaelmartins5254.vercel.app/${location}/${parent.id}`, {
      method: 'DELETE'
    })
    let data = res.json()
    console.log(data)
    try {
      setMessage(true)
      setTypeM('success')
      setMessageText('O Item será excluído em instantes')
      setTimeout(() => {
        setMessage(false)
        window.location.assign('https://ismaelmartins5254.github.io/Stock/')
      }, 2000)

    } catch (error) {
      console.log(error)
      setTypeM('error')
      setMessageText('[ERROR] ocorreu algum problema ao excluir o item, por favor tente novamente')
    }
  }

  return (
    <>
      {message && (
        <Message
          text={messageText}
          type={typeM}
        />
      )}
      <div className={Style.container}>
        <section className={Style.cards} id={id} key={id}>
          <h3>{name}</h3>
          {description && (
            <>
              <p>Descrição do item: <span>{description}</span> </p>
              <p>Valor Unitário: R${value}</p>
              <p>Quantidade: {quant}</p>
              <p>Valor Total: R${valueT}</p>
              <p>Setor do item: {type}</p>
            </>
          )}
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
                onclick={DelIten}
              />
            </div>
          </div>
        </section>
      </div >
    </>
  )
}

export default Cards