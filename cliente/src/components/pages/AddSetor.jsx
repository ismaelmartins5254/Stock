import { useState } from 'react'
import Button from '../form/Button'
import Inputs from '../form/Inputs'
import Style from './AddSetor.module.css'
import Axios from 'axios'

function AddSetor() {


  let [setor, setSetor] = useState('')
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')

  const Adsetor = async (e) => { //sistema de adicionar item no "BD" com async function

    e.preventDefault()

    if (setor == 0) { //caso o input de adicionar setor esteja vazio
      setMessage(true)
      setType('error') //class para estilização no codigo de mensagem
      setText('Por favor digite algo antes de adicionar!') //mensagem que aparecerar

      setTimeout(() => { //time que vai ficar aparecendo a mensagem
        setMessage(false)
      }, 2000)
      return
    }

    Axios.post('http://localhost:5000/AddSetor', {
      "setor": `${setor}`
    })

    try {
      //tratamento do sucesso ao adicionar o item
      setMessage(true)
      setType('success')
      setText('O Item será adicionado em instantes')
      console.log('deu certo')
      setTimeout(() => {
        setMessage(false)
      }, 1000)
    }

    catch (error) { //tratamento de erro ao adicionar o item
      console.log(error)
      setMessage(true)
      setType('error')
      setText('Ocorreu algum problema ao adicionar, por favor tente novamente. :)')
      console.log('deu erro')
      setTimeout(() => {
        setMessage(false)
      }, 1000)
      return
    }


  }


  return (
    <div className={Style.AddSetor}>
      <Inputs
        type='text'
        place='o nome do setor'
        ValueLabel='Digite aqui o nome do setor: '
        change={(e) => setSetor(e.target.value)}
      />
      <Button
        text='Adicionar'
        onclick={Adsetor}
      />
    </div>
  )
}

export default AddSetor