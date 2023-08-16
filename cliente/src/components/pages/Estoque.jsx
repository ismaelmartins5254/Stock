import { useEffect, useState } from 'react'
import Axios from 'axios'

import Cards from '../layout/Cards'
import PageEdit from '../pages/PageEdit'
import ButtonLink from '../layout/ButtonLink'

import Style from './Estoque.module.css'



function Estoque() {

  let [item, setItem] = useState()
  let [EditItem, setEditItem] = useState(false)
  let [Section, setSection] = useState([])

  useEffect(() => { //Executar apenas uma vez sem precisar de uma requisição manual
    Axios.get('http://localhost:5000/getaddIten').then((res) => {
      setItem(res.data)
    })

  }, [])

  const EditIten = async (e) => {//sistema de edição dos itens
    e.preventDefault()
    let iten = e.target
    let parent = iten.closest('section')
    console.log(parent.className = 'itDesc')
    let res = await fetch(`http://localhost:5000/addIten/${parent.id}`) // selecionando o card clicado ao BD
    let data = await res
    setSection(data)
    setEditItem(true)//mostrar a página de edição
  }

  return (
    <div className={Style.container}>

      {EditItem ? (
        <PageEdit
          namep={Section.name}
          descriptionp={Section.description}
          valuep={Section.value}
          valueTp={Section.valueT}
          typep={Section.type}
          key={Section.id}
          quantp={Section.quant}
          id={Section.id}
        />

      ) : (
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