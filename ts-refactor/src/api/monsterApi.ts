const baseUrl = 'http://localhost:8080/monster'

async function getRandomMonster() {
	const res = await fetch(baseUrl + '/random')
	return res.json()
}

export { getRandomMonster }
