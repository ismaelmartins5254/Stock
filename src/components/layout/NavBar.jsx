import Style from './NavBar.module.css'
import { Link } from 'react-router-dom'

function NavBar({ Title }) {
    return (
        <div className={Style.container}>
            <Link to='/'>
            <h2 className={Style.title}>{Title}</h2>
            </Link>
            <ul className={Style.links}>
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
            </ul>
        </div >
    )
}

export default NavBar