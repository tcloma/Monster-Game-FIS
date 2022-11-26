import { make } from '../utils/helpers'
import generic from '../styles/generics.module.css'
import styles from '../styles/home.module.css'

export function homePage() {
	const page = make('div', generic.page + ' ' + styles.page)

	const header = make('div', styles.header)
	const title = make('h1', styles.title, 'Kaijugochi')
	const subTitle = make(
		'p',
		styles.para,
		'Care for your very own Pixel Monster!'
	)
	header.append(title, subTitle)

	const generateBtns = make('div', styles.spacedRow)
	const randomBtn = make('btn', generic.btn + ' ' + styles.wHalf, 'Random')
	const customBtn = make('btn', generic.btn + ' ' + styles.wHalf, 'Custom')
	generateBtns.append(randomBtn, customBtn)

	page.append(header, generateBtns)
	return page
}
