async function fetchRandomMonster() {
	const res = await fetch('http://localhost:8080/monster/random')
	return res.json()
}

export { fetchRandomMonster }
