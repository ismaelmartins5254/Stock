import { useState } from 'react'

import Inputs from '../form/Inputs'
import Button from '../form/Button'

import Style from './PageEdit.module.css'


function PageEdit({ namep, descriptionp, quantp, typep, valuep, valueTp, id }) {

  let [name, setName] = useState(`fei`)
  let [description, setDescription] = useState(`${descriptionp}`)
  let [value, setValue] = useState(`${valuep}`)
  let [quant, setQuant] = useState(`${quantp}`)

  function EditIten(e) {
    e.preventDefault()
    fetch(`http://localhost:5000/itens/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        "name": `${name}`,
        "description": `${description}`,
        "value": `${value}`,
        "type": `${typep}`,
        "quant": `${quant}`,
        "valueT": `${value * quant}`
      })
    }).then(data => console.log)
   
  }

  return (
    <div className={Style.container}>
      <h2>Edição do item {name}</h2>
      <Inputs
        ValueLabel='Nome do item'
        type='text'
        value={name ? name : ''}
        change={(e) => setName(e.target.value)}
      />
      <Inputs
        type='text'
        place={descriptionp}
        ValueLabel='Descrição do item: '
        change={e => setDescription(e.target.value)}
      />
      <Inputs
        type="number"
        place={valuep}
        ValueLabel='Valor Unitário: '
        change={e => setValue(e.target.value)}
      />

      <Inputs
        type="number"
        place={quantp}
        ValueLabel='Quantidade: '
        change={e => setQuant(e.target.value)}
      />
      <Inputs
        type="number"
        place={valueTp}
        ValueLabel='Valor Total:'
      />
      <p>Setor do item: {typep}</p>
      <Button
        text='Concluir edição'
        onclick={EditIten}
      />
    </div>
  )
}

export default PageEdit