import { useState } from 'react'
import Axios from "axios"

import Style from './EdicaoSetor.module.css'

import Button from '../form/Button'
import Inputs from '../form/Inputs'
import Message from '../layout/Message'

function EdicaoSetor({ ItenEdit, id }) {

  let [ItenEditing, setItenEditing] = useState('')
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')
  const linkBack = "https://stock-api-6p8t.onrender.com/"


  const editCompleted = async (e) => {
    e.preventDefault()
    await Axios.put(`${linkBack}editSetor`, {
      "iten": `${ItenEditing}`,
      "id": `${id}`
    })
    try {

      //tratamento do sucesso ao adicionar o item
      setMessage(true)
      setType('success')
      setText('O Item foi editado com sucesso, recarregue a página para visualizá-lo')

      setTimeout(() => {
        setMessage(false)
      }, 5000)
    }

    catch (error) { //tratamento de erro ao adicionar o item
      console.log(error)
      setMessage(true)
      setType('error')
      setText('Ocorreu algum problema ao editar o item, por favor tente novamente. :)')
      setTimeout(() => {
        setMessage(false)
      }, 1000)
    }
  }

  return (
    <>
      {message && ( // menssagem especificando se o item foi adicionado ou não
        <Message
          type={Type}
          text={Text}
        />
      )}
      <div className={Style.edit}>
        <Inputs
          type='text'
          place='o nome do setor'
          ValueLabel='Digite aqui o nome do setor: '
          value={ItenEdit.innerText}
          change={e => setItenEditing(e.target.value)}
        />
        <Button
          text='Concluir edição'
          onclick={editCompleted}
        />
      </div>
    </>
  )
}

export default EdicaoSetor