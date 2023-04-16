import Style from './Header.module.css'

function Header({Title, a1, a2, a3}) {
    return (
        <div className={Style.container}>
            <h2 className={Style.title}>{Title}</h2>
            <ul className={Style.links}>
                <li>
                    <a href="">{a1}</a>
                </li>
                <li>
                    <a href="">{a2}</a>
                </li>
                <li>
                    <a href="">{a3}</a>
                </li>
            </ul>
        </div>
    )
}

export default Header