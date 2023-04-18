import { useEffect, useState } from 'react'
import Cards from '../layout/Cards'
import PageEdit from '../pages/PageEdit'
import ButtonLink from '../layout/ButtonLink'

import Style from './Estoque.module.css'


function Estoque() {

  let [item, setItem] = useState('')
  let [EditItem, setEditItem] = useState(false)
  let [Section, setSection] = useState([])

  useEffect(() => { //Executar apenas uma vez sem precisar de uma requisição manual
    fetch('http://localhost:5000/itens') //requisição GET para adicionar todos os itens já cadastrado no documento
      .then(res => res.json())
      .then(data => {
        setItem(data)
      })
      .catch(err => console.log(err))
  }, [])

  const EditIten = async (e) => {//sistema de edição dos itens
    e.preventDefault()
    let iten = e.target
    let parent = iten.closest('section')
    let res = await fetch(`http://localhost:5000/itens/${parent.id}`) // selecionando o card clicado ao BD
    let data = await res.json()
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
          />
        ))
      )
      }
      <div className={Style.AddIten}>
        <p>Nenhum item adicionado</p>
        <p>Clique no botão abaixo para adicionar um item</p>
        
        <ButtonLink
          to='/AddIten'
          text='Adicionar Item'
        />
      </div>
    </div>

  )
}

export default Estoque