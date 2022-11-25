import express from 'express'
import cors from 'cors'

const app = express()
const port = 8080

app.use(cors())

async function fetchRandomMonster() {
	const response = await fetch(
		'https://app.pixelencounter.com/api/basic/monsters/random/json'
	)
	return response.json()
}

app.get('/', (req, res) => {
	res.send('Hello from proxy')
})

app.get('/monster/random', async (req, res) => {
	res.send(await fetchRandomMonster())
})

app.listen(port, () => {
	console.log(`proxy listening at http://localhost:${port}`)
})
