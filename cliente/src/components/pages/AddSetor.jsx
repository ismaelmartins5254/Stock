

//o sistema de exclusão dos itens está na página Cards
import { useState, useEffect } from "react"

import Style from './AddSetor.module.css'

import Inputs from "../form/Inputs"
import Button from "../form/Button"
import Cards from "../layout/Cards"
import Message from '../layout/Message'
import Axios from "axios"


function AddSetor() {

  let [setor, setSetor] = useState('')
  let [ItensSaves, setItensSaves] = useState('')
  let [ItenEdit, setItenEdit] = useState('')
  let [ItenEditing, setItenEditing] = useState('')
  let [Id, setId] = useState('')
  let [TextAdd, setTextAdd] = useState(false)
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')

  useEffect(() => { //pegando todos os itens já adicionados no "BD" useEffect para executar uma vez

    Axios.get('http://localhost:5000/getsetor')
      .then((res) => {
        setItensSaves(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const Adsetor = async (e) => { //sistema de adicionar item no "BD" com async function

    if (setor == 0) {
      setMessage(true)
      setType('error')
      setText('Por favor digite algo antes de adicionar!')

      setTimeout(() => {
        setMessage(false)
      }, 2000)
      return
    }

    e.preventDefault()

    Axios.post('http://localhost:5000/AddSetor', {
      setor: `${setor}`
    })

    try {
      //tratamento do sucesso ao adicionar o item
      setMessage(true)
      setType('success')
      setText('O Item será adicionado em instantes')

      setTimeout(() => {
        setMessage(false)
      }, 1000)
    }

    catch (error) { //tratamento de erro ao adicionar o item
      console.log(error)
      setMessage(true)
      setType('error')
      setText('Ocorreu algum problema ao adicionar, por favor tente novamente. :)')
      setTimeout(() => {
        setMessage(false)
      }, 1000)
      return
    }


  }

  const edit = (e) => { //pegando o valor do item para fazer a edição do mesmo
    let iten = e.target
    let parent = iten.closest('section')
    setItenEdit(parent.firstChild)
    setId(parent.id)
  }

  const editCompleted = async (e) => {
    e.preventDefault()
    await Axios.put("http://localhost:5000/editSetor", {
      "iten": `${ItenEditing}`,
      "id": `${Id}`
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
    <div className={Style.container}>
      {message && ( // menssagem especificando se o item foi adicionado ou não
        <Message
          type={Type}
          text={Text}
        />
      )}


      {TextAdd ? ( // sistema para adicionar os itens
        <div className={Style.AddSetor}>
          <Inputs
            type='text'
            place='o nome do setor'
            ValueLabel='Digite aqui o nome do setor: '
            change={e => setSetor(e.target.value)}
          />
          <Button
            text='Adicionar'
            onclick={Adsetor}
          />
        </div>
      ) : (
        <div className={Style.Addnew}>
          <Button
            text='Adicionar novo setor'
            onclick={() => setTextAdd(true)}
          />
        </div>
      )}


      {ItenEdit ? ( //sistema para edição dos itens
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
      ) : (

        ItensSaves && ( //mostrando os itens já adicionados na tela
          <div className={Style.cards} >
            {ItensSaves.map((iten) => (
              <Cards
                name={iten.setor}
                key={iten.id}
                location='types'
                id={iten.id}
                ButtonEditIten={edit}
              />
            ))}
          </div>
        ))}

    </div>
  )
}


export default AddSetor