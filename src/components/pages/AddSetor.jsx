import { useState, useEffect } from "react"

import Style from './AddSetor.module.css'

import Inputs from "../form/Inputs"
import Button from "../form/Button"
import Cards from "../layout/Cards"
import Message from '../layout/Message'


function AddSetor() {

  let [setor, setSetor] = useState('')
  let [ItensSaves, setItensSaves] = useState('')
  let [ItenEdit, setItenEdit] = useState('')
  let [ItenEdited, setItenEdited] = useState('')
  let [TextAdd, setTextAdd] = useState(false)
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')
  let [key, setKey] = useState('')


  let link = 'http://localhost:5000/types'

  useEffect(() => { //pegando todos os itens já adicionados no "BD" useEffect para executar uma vez
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setItensSaves(data)
      })
      .catch((err) => console.log(err))
  }, [])



  const Adsetor = async (e) => { //sistema de adicionar item no "BD" com async function
    e.preventDefault()
    console.log(setor)

    let newSetor = [...new Set(ItensSaves)]
    newSetor = newSetor.map(e => e.name)
    console.log(newSetor)
    if (newSetor.indexOf(setor) != -1 || newSetor == '') { //verificando se o item já está cadastrado no BD
      setMessage(true)
      setType('error')
      setText('O Item já cadastrado, caso queira editá-lo clique no botão "Editar".')

      setTimeout(() => {
        setMessage(false)
      }, 5000)

      return // se o item ja tiver sido cadastrado anteriormente retorna daqui
    }

    let res = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${setor}`
      })
    })
    try {
      //tratamento do sucesso ao adicionar o item
      setMessage(true)
      setType('success')
      setText('O Item será adicionado em instantes')

      setTimeout(() => {
        setMessage(false)
        location.reload()
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

  const TakeEdit = (e) => { //pegando o valor do item para fazer a edição do mesmo
    let iten = e.target
    let parent = iten.closest('section')
    setItenEdit(parent)
  }

  const ItenEditing = async e => { //editando o item
    e.preventDefault()
    let res = await fetch(`${link}/${ItenEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({
        "name": `${ItenEdited}`
      })
    })

    try { // tratamento da promisse caso concluido com sucesso
      setMessage(true)
      setText(`O Item ${ItenEdit.firstChild.innerText} foi Editado com sucesso`)
      setType('success')

      setTimeout(() => {
        setMessage(false)
        location.reload()
      }, 2000)
    } catch (error) {
      console.log(error)
      setMessage(true)
      setText(`[ERRO] Ocorreu um erro, por favor tente novamente em instantes`)
      setType('error')
      setTimeout(() => {
        setMessage(false)
        location.reload()
      }, 2000)
    }

  }

  function keyup(e) {
    if (e.key == "Enter") {
      Adsetor
      return
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

      {TextAdd ? ( // sistema para adicionar os itens
        <div className={Style.AddSetor}>
          <Inputs
            type='text'
            place='o nome do setor'
            ValueLabel='Digite aqui o nome do setor: '
            change={e => { setSetor(e.target.value) }}
            keyup={keyup}
          />
          <Button
            text='Adicionar'
            onclick={Adsetor}
          />
        </div>
      ) : (
        <div className={Style.BtnAdSetor}>
          <Button
            text='Adicionar novo setor'
            onclick={() => setTextAdd(true)}
          />
        </div>
      )}


      {ItenEdit ? ( //sistema para edição dos itens
        <div className={Style.EditSe}>
          <Inputs
            type='text'
            place='o nome do setor'
            ValueLabel='Digite aqui o nome do setor: '
            value={ItenEdit.firstChild.innerText}
            change={e => setItenEdited(e.target.value)}
            key={ItenEditing}
          />
          <Button
            text='Concluir edição'
            onclick={ItenEditing}
          />
        </div>
      ) : (

        ItensSaves && ( //mostrando os itens já adicionados na tela

          <div className={Style.cards} >
            {ItensSaves.map((iten) => (
              <Cards //o sistema de exclusão dos itens está na página Cards
                name={iten.name}
                key={iten.id}
                location='types'
                id={iten.id}
                ButtonEditIten={TakeEdit}
              />
            ))}
          </div>
        ))}

    </>
  )
}

export default AddSetor