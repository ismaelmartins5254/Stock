import { useEffect, useState } from "react"

import Style from './Types.module.css'

function Types({ onchange }) {

  let [select, setSelect] = useState([])

  useEffect(() => {
    fetch(' https://server-stock-j6wli97bb-ismaelmartins5254.vercel.app/types') //requisição aos tipos que serão adicionados (por enquanto ta adicionado fixo)
      .then((res) => res.json())
      .then((data) => {
        setSelect(data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <>
      <select onChange={onchange} className={Style.sele}>
        <option value='Selecione uma opção'>Selecione uma opção</option>
        {select.map(options => (
          <option value={options.name} key={options.id}>{options.name}</option>
        ))}
      </select>
    </>
  )

}

export default Types