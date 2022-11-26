const baseUrl = 'http://localhost:8080/monster'

async function getRandomMonster() {
	const res = await fetch(baseUrl + '/random')
	return res.json()
}

async function getCustomMonster(
	color1: string,
	color2: string,
	fillType: string
) {
	const res = await fetch(
		baseUrl +
			`/custom/?primaryColor=${color1}&secondaryColor=${color2}&fillType=${fillType}`
	)
	return res.json()
}

export { getRandomMonster, getCustomMonster }
