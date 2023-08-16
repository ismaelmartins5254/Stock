import ButtonLink from '../layout/ButtonLink'

import Style from './Home.module.css'

function Home() {

	return (
		<div className={Style.container}>
			<h2 className={Style.title}>Seja bem-vindo ao <span className={Style.NameBus}>Stock</span></h2>
			<p className={Style.minText}>O melhor sistema de gerenciamento de estoque</p>
			<p className={Style.minText}>Clique no botão abaixo para adicionar um item</p>
			<ButtonLink
				to='/AddIten'
				text='Adicionar item'
			/>
		</div>
	)

}

export default Home