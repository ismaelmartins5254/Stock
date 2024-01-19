//Arquivo de edição dos itens adicionados

import { useState } from 'react'

import Inputs from '../form/Inputs'
import Button from '../form/Button'

import Style from './PageEdit.module.css'
import Axios from 'axios'


function PageEdit({ namep, descriptionp, quantp, typep, valuep, id }) {

  let [name, setName] = useState(`${namep}`)
  let [description, setDescription] = useState(`${descriptionp}`)
  let [value, setValue] = useState(`${valuep}`)
  let [quant, setQuant] = useState(`${quantp}`)
  async function EditIten(e) {
    e.preventDefault()
    Axios.put(`http://localhost:5000/editItens`, {
      "name": `${name}`,
      "description": `${description}`,
      "value": `${value}`,
      "type": `${typep}`,
      "quant": `${quant}`,
      "valueT": `${value * quant}`,
      "id": `${id}`
    }).then((res) => {
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })

  }

  return (
    <div className={Style.container}>
      <h2 className={Style.title}>Edição do item {namep}</h2>
      <Inputs
        ValueLabel='Nome do item'
        place={'o Nome do Item'}
        type='text'
        value={namep ? name : ''}
        change={(e) => setName(e.target.value)}
      />
      <Inputs
        type='text'
        place={'a Descrição do Item'}
        value={descriptionp}
        ValueLabel='Descrição do item: '
        change={e => setDescription(e.target.value)}
      />
      <Inputs
        type="number"
        place={'o Valor do Item'}
        value={valuep}
        ValueLabel='Valor Unitário: '
        change={e => setValue(e.target.value)}
      />

      <Inputs
        type="number"
        place={'a Quantidade do Item'}
        value={quantp}
        ValueLabel='Quantidade: '
        change={e => setQuant(e.target.value)}
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