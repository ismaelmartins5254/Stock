import  Axios  from "axios"
import { useEffect, useState } from "react"

import Style from './Types.module.css'

function Types({ onchange }) {

  let [select, setSelect] = useState([])
  const linkBack = "https://stock-api-6p8t.onrender.com/"

  useEffect( () => {
      Axios.get(`${linkBack}getsetor`)  //requisição aos tipos que serão adicionados 
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