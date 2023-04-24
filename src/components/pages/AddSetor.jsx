import { useState, useEffect } from "react"

import Style from './AddSetor.module.css'

import Inputs from "../form/Inputs"
import Button from "../form/Button"
import Cards from "../layout/Cards"


function AddSetor() {

  let [setor, setSetor] = useState('')
  let [ItensSaves, setItensSaves] = useState('')
  let [ItenEdit, setItenEdit] = useState('')
  let [TextEdit, setTextEdit] = useState('')


  useEffect(() => {
    fetch('http://localhost:5000/types')
      .then((res) => res.json())
      .then((data) => {
        setItensSaves(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const Adsetor = async (e) => {
    e.preventDefault()
    let res = await fetch('http://localhost:5000/types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${setor}`
      })
    })
    let data = res.json()
    console.log(data)
  }

  const edit = (e) => {
    let iten = e.target
    let parent = iten.closest('section')
    setItenEdit(parent.firstChild)
    console.log(ItenEdit.innerText)
  }

  return (
    <>

      {ItenEdit ? (
        <div>
          <Inputs
            type='text'
            place='o nome do setor'
            ValueLabel='Digite aqui o nome do setor: '
            change={e => setSetor(e.target.value)}
            value={ItenEdit.innerText}
          />
          <Button
            text='Concluir edição'

          />
        </div>
      ) : (
        <Button
          text='Adicionar novo setor'
          onclick={Adsetor}
        />
      )}


      {ItensSaves && (
        <>

          <div className={Style.cards} >
            {ItensSaves.map((iten) => (

              <Cards //the exclusion system is on the Cards page
                name={iten.name}
                key={iten.id}
                location='types'
                id={iten.id}
                ButtonEditIten={edit}

              />

            ))}
          </div>
        </>
      )}
    </>
  )
}

export default AddSetor