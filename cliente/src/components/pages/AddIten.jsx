import { useState } from 'react'
import Axios from 'axios'

import Style from './AddIten.module.css'

import Types from "../form/Types"
import Inputs from "../form/Inputs"
import Button from "../form/Button"
import Message from '../layout/Message'


function AddIten() {

  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [value, setValue] = useState('')
  let [quant, setQuant] = useState('')
  let [select, setSelect] = useState('')
  let [message, setMessage] = useState(false)
  let [Type, setType] = useState('')
  let [Text, setText] = useState('')


  async function AddIten() {

    let link = 'https://server-stock-j6wli97bb-ismaelmartins5254.vercel.app/itens' // link do BD

    if (name == 0 || description == 0 || value == 0 || quant == 0 || select == 0) { //verificação se todos os states foram alterados
      setMessage(true)
      setType('error')
      setText('Preencha todos os itens antes de continuar :)')
      setTimeout(() => {
        setMessage(false)
      }, 2000)
      return
    }



    var res = await fetch(link, { // adicionando os itens no BD
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${name}`,
        "description": `${description}`,
        "value": `${value}`,
        "type": `${select}`,
        "quant": `${quant}`,
        "valueT": `${value * quant}`
      }),

    })
    try {
      setMessage(true)
      setType('success')
      setText('O Item será adicionado em instantes')
      setTimeout(() => {
        setMessage(false)
        
      }, 2000)
    } catch (error) {
      console.log(error)
    }

    //banco de dados back end 
    Axios.post('http://localhost:5000/addIten', {
      name: `${name}`,
      description: `${description}`,
      value: `${value}`,
      type: `${select}`,
      quant: `${quant}`,
      valueT: `${value * quant}`
    }).then((res)=>{
      console.log(res)
    })

  }


  return (
    <>
      {message && ( // menssagem especificando se o item foi adicionado ou não
        <Message type={Type} text={Text} />
      )}
      <div className={Style.container}>
        <section className={Style.box}>
          <Inputs
            place='o Nome do item'
            type='text'
            change={(e) => setName(e.target.value)}
            id='name'
            ValueLabel='Digite o Nome Do Item'
            value={name ? name : ''}
          />
          <Inputs
            place='a Descrição'
            type='text'
            change={(e) => setDescription(e.target.value)}
            id='description'
            ValueLabel='Digite a Descrição do Item'
            value={description ? description : ''}
          />
          <Inputs
            place='o Valor'
            type='number'
            change={(e) => setValue(e.target.value)}
            id='value'
            ValueLabel='Digite o Valor Do Item'
            value={value ? value : ''}
          />
          <Inputs
            place='a Quantidade'
            type='number'
            change={(e) => setQuant(e.target.value)}
            id='quant'
            ValueLabel='Digite a Quantidade De Itens'
            value={quant ? quant : ''}
          />

          <Types
            options={select}
            onchange={e => setSelect(e.target.value)}

          />

          <Button
            onclick={AddIten}
            text='Enviar'
          />
        </section>
      </div>

    </>
  )
}

export default AddIten