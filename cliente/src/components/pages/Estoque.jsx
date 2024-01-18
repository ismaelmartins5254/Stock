import { useEffect, useState } from 'react'
import Axios from 'axios'
//importação da function derequisição ao banco de dados AWS


import Cards from '../layout/Cards'
import PageEdit from '../pages/PageEdit'
import ButtonLink from '../layout/ButtonLink'

import Style from './Estoque.module.css'



function Estoque(AWSDB) {

  let [item, setItem] = useState()
  let [EditItem, setEditItem] = useState(false)
  let [Section, setSection] = useState([])

  useEffect(() => { //Executar apenas uma vez sem precisar de uma requisição manual

    Axios.get('/getaddIten')
    console.log(AWSDB)
  }, [])

  const EditIten = async (e) => { //sistema de edição dos itens
    e.preventDefault()
    let iten = e.target
    let parent = iten.closest('section')
    let res = await Axios.get(`http://localhost:5000/getItensforEdit?id=${parent.id}`) // selecionando o card clicado ao BD
    let data = await res
    setSection(data.data)
    setEditItem(true) //mostrar a página de edição
  }

  return (
    <div className={Style.container}>

      {EditItem ?
        Section.map((e) => (
          <PageEdit
            namep={e.name}
            descriptionp={e.description}
            valuep={e.value}
            valueTp={e.valueT}
            typep={e.type}
            key={e.id}
            quantp={e.quant}
            id={e.id}
          />
        )) : (
          item && item.map((iten) => (
            //O sistema de deletar os itens está na página cards
            <Cards
              key={iten.id}
              name={iten.name}
              description={iten.description}
              value={iten.value}
              valueT={iten.valueT}
              type={iten.type}
              quant={iten.quant}
              id={iten.id}
              ButtonEditIten={EditIten}
              editP={EditItem}
              location='itens'
            />
          ))
        )
      }{item == 0 && ( //se não tiver nenhum item adicionado
        <div className={Style.AddIten}>
          <p>Nenhum item adicionado</p>
          <p>Clique no botão abaixo para adicionar um item</p>

          <ButtonLink
            to='/AddIten'
            text='Adicionar Item'
          />
        </div>
      )}
    </div>

  )
}

export default Estoque