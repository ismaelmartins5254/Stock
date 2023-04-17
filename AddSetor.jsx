import { useState } from "react"
import Inputs from "../form/Inputs"


function AddSetor() {

  let [setor, setSetor] = useState('')

  return (
    <Inputs
      type='text'
      place='o nome do setor'
      ValueLabel='Digite aqui o nome do setor: '
      change={e=>setSetor(e.target.value)}
    />
  )
}

export default AddSetor