import { useState } from 'react'
import Axios from "axios"

import Style from './EdicaoSetor.module.css'

import Button from '../form/Button'
import Inputs from '../form/Inputs'

function EdicaoSetor({ItenEdit, id}) {

  let [ItenEditing, setItenEditing] = useState('')
  

  const editCompleted = async (e) => {
    e.preventDefault()
    await Axios.put("http://localhost:5000/editSetor", {
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
  )
}

export default EdicaoSetor