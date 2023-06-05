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
                <Hamburger onToggle={togle} size={20} />
            </div>
            {menuOpen ? (
                <div className={Style.links}>
                    <Header />
                </div>
            ) : (
                <div className={`${Style.links} ${Style.Comp}`}>
                    <Header />
                </div>
            )}
            <div className={Style.redesSociais}>

                <a href="https://github.com/ismaelmartins5254">
                    <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/github.png" alt="github" /> <span>Github</span>
                </a>
                <a href="https://www.linkedin.com/in/ismael-martins-de-figueiredo-38bb32232/">
                    <img width="25" height="25" src="https://img.icons8.com/material-rounded/24/linkedin.png" alt="linkedin" /><span>Linkedin</span>
                </a>
            </div>
        </div >
    )
}

export default NavBar