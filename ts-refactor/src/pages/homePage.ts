import { make } from '../utils/helpers'
import generic from '../styles/generics.module.css'
import styles from '../styles/home.module.css'
import { getCustomMonster, getRandomMonster } from '../api/monsterApi'

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

async function handleCustomClick() {
	const data = await getCustomMonster('FFFFFF', '000000', '2')
	console.log(data)
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

	customBtn.addEventListener('click', () => handleCustomClick())
	randomBtn.addEventListener('click', () => handleRandomClick())
	generateBtns.append(randomBtn, customBtn)

	const optionsInputs = make('div', styles.spacedRow)
	const primaryColor = make('input', '') as HTMLInputElement
	const secondaryColor = make('input', '') as HTMLInputElement
	primaryColor.type = 'color'
	primaryColor.value = colors === undefined ? '#FFFFFF' : colors[1]
	secondaryColor.type = 'color'
	secondaryColor.value = colors === undefined ? '#FFFFFF' : colors[2]
	optionsInputs.append(primaryColor, secondaryColor)

	page.append(header, generateBtns, optionsInputs, pixelCanvas)
	return page
}

export default homePage
