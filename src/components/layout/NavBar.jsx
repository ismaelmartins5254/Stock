import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

import Style from './NavBar.module.css'


function NavBar({ Title }) {

    let [menuOpen, setMenuOpen] = useState(false)

    let togle = (togled) => {
        if (togled) {
            setMenuOpen(true)
        } else {
            setMenuOpen(false)
        }
    }

    return (
        <div className={Style.container}>
            <Link to='/'>
                <h2 className={Style.title}>{Title}</h2>
            </Link>
            <div className={Style.menu}>
                <Hamburger onToggle={togle} size={20}  />
            </div>
            {menuOpen ? (
                <div className={Style.links}>
                    <Header/>
                </div>
            ) : (
                <div className={`${Style.links} ${Style.Comp}`}>
                    <Header />
                </div>
            )}

        </div >
    )
}

export default NavBar