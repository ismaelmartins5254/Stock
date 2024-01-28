import { useEffect, useState } from 'react'
import Axios from 'axios'
//importação da function derequisição ao banco de dados AWS


import Cards from '../layout/Cards'
import PageEdit from '../pages/PageEdit'
import ButtonLink from '../layout/ButtonLink'

import Style from './Estoque.module.css'



function Estoque() {

  let [item, setItem] = useState() //saçvar os itens da requisição GET no UseEffect apresentando na página
  let [EditItem, setEditItem] = useState(false) //pagina especifica para edição
  let [Editing, setEditing] = useState([]) //Salvar os itens para edição 

  const linkBack = "https://stock-api-6p8t.onrender.com/"

  useEffect( () => { //Executar apenas uma vez sem precisar de uma requisição manual

    Axios.get(`${linkBack}getaddIten`)
    .then(res =>{
      setItem(res.data)
    }).catch(err => console.log(err))
  }, [])

  const EditIten = async (e) => { //sistema de edição dos itens
    e.preventDefault()
    let iten = e.target
    let parent = iten.closest('section')
    let res = await Axios.get(`${linkBack}getItensforEdit?id=${parent.id}`) // selecionando o card clicado ao BD
    let data = await res
    setEditing(data.data)
    setEditItem(true) //mostrar a página de edição
  }

  return (
    <div className={Style.container}>

      {EditItem ?
        Editing.map((e) => (
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
              valueT={iten.value*iten.quant}
              type={iten.type}
              quant={iten.quant}
              id={iten.id}
              ButtonEditIten={EditIten}
              editP={EditItem}
              location='Itens'
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