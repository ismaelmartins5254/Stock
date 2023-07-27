import { useState, useEffect } from "react"
import Axios from "axios"

import Style from './AddSetor.module.css'

import Inputs from "../form/Inputs"
import Button from "../form/Button"
import Cards from "../layout/Cards"
import Message from '../layout/Message'



function AddSetor() {

  let [setor, setSetor] = useState('')
  let [ItensSaves, setItensSaves] = useState('')
  let [ItenEdit, setItenEdit] = useState('')
  let [TextAdd, setTextAdd] = useState(false)
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')

  useEffect(() => { //pegando todos os itens já adicionados no "BD" useEffect para executar uma vez
    Axios.get('http://localhost:5000/GetSetor')
      .then((res) => res.json())
      .then((data) => {
        setItensSaves(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const Adsetor = (e) => { //sistema de adicionar item no "BD" com async function
    e.preventDefault()

    Axios.post('http://localhost:5000/addSetor', {
      setor: `${setor}`
    })

    try {
      //tratamento do sucesso ao adicionar o item
      setMessage(true)
      setType('success')
      setText('O Item será adicionado em instantes')

      setTimeout(() => {
        setMessage(false)
        //window.location.assign('https://ismaelmartins5254.github.io/Stock/')
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
    console.log(ItenEdit.innerText)
  }

  return (
    <>
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
        <Button
          text='Adicionar novo setor'
          onclick={() => setTextAdd(true)}
        />
      )}


      {ItenEdit ? ( //sistema para edição dos itens
        <>
          <Inputs
            type='text'
            place='o nome do setor'
            ValueLabel='Digite aqui o nome do setor: '
            value={ItenEdit.innerText}
          />
          <Button
            text='Concluir edição'
          />
        </>
      ) : (

        ItensSaves && ( //mostrando os itens já adicionados na tela
          <div className={Style.cards} >
            {ItensSaves.map((iten) => (
              <Cards //o sistema de exclusão dos itens está na página Cards
                name={iten.name}
                key={iten.id}
                location='types'
                id={iten.id}
                ButtonEditIten={edit}
              />
            ))}
          </div>
        ))}

    </>
  )
}

export default AddSetor