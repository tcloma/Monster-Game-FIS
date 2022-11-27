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

async function handleCustomClick(
	color1: string,
	color2: string,
	fillType: string
) {
	const data = await getCustomMonster(color1, color2, fillType)
	pattern = data.pattern
	colors = data.colors
	console.log({ pattern, colors })
	renderPixels()
}

const pixelCanvas = make('div', { className: styles.canvas })

function renderPixels() {
	pixelCanvas.innerHTML = ''
	const monster = make('div', { className: styles.monster })
	pattern.forEach((row) => {
		const patternRow = make('div', { className: styles.row })
		row.forEach((cell) => {
			const pixel = make('div', { className: styles.pixel })
			pixel.style.backgroundColor = colors[cell as keyof IColors]
			patternRow.append(pixel)
		})
		monster.append(patternRow)
	})
	pixelCanvas.append(monster)
}

const homePage = () => {
	const page = make('div', { className: generic.page + ' ' + styles.page })

	const header = make('div', { className: styles.header })
	const title = make('h1', { className: styles.title }, 'Kaijugochi')
	const subTitle = make(
		'p',
		{ className: styles.para },
		'Care for your very own Pixel Monster!'
	)
	header.append(title, subTitle)

	const generateBtns = make('div', { className: styles.spacedRow })
	const randomBtn = make(
		'btn',
		{ className: generic.btn + ' ' + styles.wHalf },
		'Random'
	)
	const customBtn = make(
		'btn',
		{ className: generic.btn + ' ' + styles.wHalf },
		'Custom'
	)

	customBtn.addEventListener('click', () =>
		handleCustomClick(
			primaryColor.value.split('#')[1].toString(),
			secondaryColor.value.split('#')[1].toString(),
			fillSelector.value
		)
	)
	randomBtn.addEventListener('click', () => handleRandomClick())
	generateBtns.append(randomBtn, customBtn)

	const optionsInputs = make('div', { className: styles.spacedRow })

	const labelPrimary = make('label', { className: styles.colorLabel })
	const primaryColor = make('input', {
		type: 'color',
		value: '#FFFFFF',
		className: styles.colorInput,
	}) as HTMLInputElement
	labelPrimary.style.backgroundColor = primaryColor.value
	labelPrimary.append(primaryColor)

	primaryColor.addEventListener(
		'change',
		() => (labelPrimary.style.backgroundColor = primaryColor.value)
	)

	const labelSecondary = make('label', { className: styles.colorLabel })
	const secondaryColor = make('input', {
		type: 'color',
		value: '#FFFFFF',
		className: styles.colorInput,
	}) as HTMLInputElement
	labelSecondary.style.backgroundColor = secondaryColor.value
	labelSecondary.append(secondaryColor)

	secondaryColor.addEventListener(
		'change',
		() => (labelSecondary.style.backgroundColor = secondaryColor.value)
	)

	const fillSelector = make('select', {
		className: styles.select,
	}) as HTMLSelectElement
	fillSelector.append(
		make('option', { value: 'none' }, 'Select Type'),
		make('option', { value: '0' }, 'Solid'),
		make('option', { value: '1' }, 'Vertical Split'),
		make('option', { value: '2' }, 'Horizontal Split'),
		make('option', { value: '4' }, 'Scattered')
	)
	optionsInputs.append(labelPrimary, labelSecondary, fillSelector)

	page.append(header, generateBtns, optionsInputs, pixelCanvas)
	return page
}

export default homePage
