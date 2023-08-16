import { Link } from "react-router-dom";

import Style from './ButtonLink.module.css'

function ButtonLink({to, text}){
    return <Link to={to} className={Style.btn}>{text}</Link>
}

export default ButtonLink