import  Axios  from "axios"
import { useEffect, useState } from "react"

import Style from './Types.module.css'

function Types({ onchange }) {

  let [select, setSelect] = useState([])

  useEffect( () => {
      Axios.get("http://localhost:5000/getsetor/")  //requisição aos tipos que serão adicionados (por enquanto ta adicionado fixo)
     .then((res)=>{
      setSelect(res.data)
     })
  }, [])


  return (
    <>
      <select onChange={onchange} className={Style.sele}>
        <option value='Selecione uma opção'>Selecione uma opção</option>
        {select.map(options => (
          <option value={options.setor} key={options.id}>{options.setor}</option>
        ))}
      </select>
    </>
  )

}

export default Types