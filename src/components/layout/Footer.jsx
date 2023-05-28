import Style from "./Footer.module.css"

function Footer() {
    return (
        <div className={Style.container}>
            <p > Site criado para meios educativos com o objetivo de mostar um pouco das minhas habilidades</p>

            <div className={Style.redesSociais}>
                <p>Redes Sociais:</p>
                <a href="https://github.com/ismaelmartins5254">
                    <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/github.png" alt="github" /> <span>Github</span>
                </a>
                <a href="https://www.linkedin.com/in/ismael-martins-de-figueiredo-38bb32232/">
                    <img width="25" height="25" src="https://img.icons8.com/material-rounded/24/linkedin.png" alt="linkedin" /><span>Linkedin</span>
                </a>
            </div>
        </div>
    )
}

export default Footer