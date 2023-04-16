import { useState } from 'react'

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
  let [state, setState] = useState(false)


  async function AddIten() {

    if (name == 0 || description == 0 || value == 0 || quant == 0) {
      setState(true)
      setTimeout(() => {
        setState(false)
      }, 2000)
      return
    }
    let res = await fetch('http://localhost:5000/itens', {
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
     
    } catch (error) {
      console.log(error)
    }

    setName('')
    setDescription('')
    setQuant('')
    setSelect('')
    setValue('')

  }


  return (
    <>
      {state && (

        <Message type='error' text='Preencha todos os itens antes de continuar :)' />

      )}
      <div className={Style.container}>
        <section className={Style.box}>
          <Inputs
            place='Nome do item'
            type='text'
            change={(e) => setName(e.target.value)}
            id='name'
            ValueLabel='Digite o Nome Do Item'
            value={name ? name : ''}
          />
          <Inputs
            place='Descrição'
            type='text'
            change={(e) => setDescription(e.target.value)}
            id='description'
            ValueLabel='Digite a Descrição do Item'
            value={description ? description : ''}
          />
          <Inputs
            place='Valor'
            type='number'
            change={(e) => setValue(e.target.value)}
            id='value'
            ValueLabel='Digite o Valor Do Item'
            value={value ? value : ''}
          />
          <Inputs
            place='Quantidade'
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