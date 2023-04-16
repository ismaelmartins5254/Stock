import { useEffect, useState } from "react"

import Style from './Types.module.css'

function Types() {

    let [select, setSelect] = useState([])

    function sele() {
        useEffect(()=>{
        fetch(' http://localhost:5000/types')
            .then((res) => res.json())
            .then((data) => {
                setSelect(data)
                console.log(select)
            }).catch((err) => {
                console.log(err)
            })
        }, [])
    }sele()
  

    return (
        <select onChange={sele} className={Style.sele}>
            <option value='Selecione uma opção'>Selecione uma opção</option>
            {select.map(options => (
                <option value={options.name} key={options.id}>{options.name}</option>
            ))}
        </select>
    )

}

export default Types