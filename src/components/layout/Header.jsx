import { Link } from 'react-router-dom'

import Style from './Header.module.css'
function Header() {
  return (
    <div className={Style.container}>
      <ul className={Style.list}>
        <Link to='/'>
          <li>
            Inicio
          </li>
        </Link>
        <Link to='/Estoque'>
          <li>
            Estoque
          </li>
        </Link>
        <Link to='./AddIten'>
          <li>
            Adicionar Item
          </li>
        </Link>
        <Link to='./AddSetor'>
          <li>
            Adicionar Setor
          </li>
        </Link>
      </ul>
    </div>

  )
}

export default Header