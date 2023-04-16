import { useEffect, useState } from 'react'
import Cards from '../layout/Cards'
import PageEdit from '../pages/PageEdit'

import Style from './Estoque.module.css'


function Estoque() {

  let [item, setItem] = useState('')
  let [EditItem, setEditItem] = useState(false)
  let [Section, setSection] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/itens')
      .then(res => res.json())
      .then(data => {
        setItem(data)
      })
      .catch(err => console.log(err))
  }, [])

  const EditIten = async (e) => {
    e.preventDefault()
    let iten = e.target
    let parent = iten.closest('section')
    let res = await fetch(`http://localhost:5000/itens/${parent.id}`)
    let data = await res.json()
    setSection(data)
    setEditItem(true)
    console.log(data)
  }
  

  const DelIten = (e) => {
    console.log('excluir')
  }


  return (
    <div className={Style.container}>

      {EditItem ? (
        <>
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
        </>
      ) : (
        item && item.map((iten) => (
          <>
            <Cards
              name={iten.name}
              description={iten.description}
              value={iten.value}
              valueT={iten.valueT}
              type={iten.type}
             
              quant={iten.quant}
              id={iten.id}
              ButtonEditIten={EditIten}
              ButtonDelIten={DelIten}
              editP={EditItem}
            />
          </>
        ))
      )
      }
    </div>
  )
}

export default Estoque