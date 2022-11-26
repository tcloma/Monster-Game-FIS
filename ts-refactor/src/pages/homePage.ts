import { make } from '../utils/helpers'
import generic from '../styles/generics.module.css'
import styles from '../styles/home.module.css'
import { getRandomMonster } from '../api/monsterApi'

interface IColors {
	0: string
	1: string
	2: string
}

let pattern: number[][]
let colors: IColors

async function handleRandomClick() {
	const data = await getRandomMonster()
	pattern = data.pattern
	colors = data.colors
	console.log({ pattern, colors })
	renderPixels()
}

const pixelCanvas = make('div', styles.canvas)
function renderPixels() {
	pixelCanvas.innerHTML = ''
	const monster = make('div', styles.monster)
	pattern.forEach((row) => {
		const patternRow = make('div', styles.row)
		row.forEach((cell) => {
			const pixel = make('div', styles.pixel)
			pixel.style.backgroundColor = colors[cell as keyof IColors]
			patternRow.append(pixel)
		})
		monster.append(patternRow)
	})
	pixelCanvas.append(monster)
}

const homePage = () => {
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

	randomBtn.addEventListener('click', () => handleRandomClick())
	generateBtns.append(randomBtn, customBtn)

	page.append(header, generateBtns, pixelCanvas)
	return page
}

export default homePage
