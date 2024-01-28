//o sistema de exclusão dos itens está na página Cards
import { useState, useEffect } from "react"

import Style from './PageSetor.module.css'

import AddSetor from './AddSetor'
import EdicaoSetor from "./EdicaoSetor"

import Button from "../form/Button"
import Cards from "../layout/Cards"
import Axios from "axios"



function PageSetor() {

  let [ItensSaves, setItensSaves] = useState('')
  let [ItenEdit, setItenEdit] = useState('')
  let [Id, setId] = useState('')
  let [TextAdd, setTextAdd] = useState(false)


  const linkBack = "https://stock-api-6p8t.onrender.com/"

  useEffect(() => {
    Axios.get(`${linkBack}getsetor`)
      .then(response => {
        setItensSaves(response.data)
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);


  const edit = (e) => { //pegando o valor do item para fazer a edição do mesmo
    let iten = e.target
    let parent = iten.closest('section')
    setItenEdit(parent.firstChild)
    setId(parent.id)
  }


  return (
    <div className={Style.container}>
     

      {TextAdd ? ( // sistema para adicionar os itens
        <AddSetor />
      ) : (
        <div className={Style.Addnew}>
          <Button
            text='Adicionar novo setor'
            onclick={() => setTextAdd(true)}
          />
        </div>

      )}

      {ItenEdit ? ( //sistema para edição dos itens
        <EdicaoSetor
          ItenEdit={ItenEdit}
          id={Id}
        />
      ) : (
        ItensSaves && ( //mostrando os itens já adicionados na tela
          <div className={Style.cards} >
            {ItensSaves.map((iten) => (
              <Cards
                name={iten.setor}
                key={iten.id}
                location='Setor'
                id={iten.id}
                ButtonEditIten={edit}

              />
            ))}
          </div>
        ))}

    </div>
  )
}


export default PageSetor