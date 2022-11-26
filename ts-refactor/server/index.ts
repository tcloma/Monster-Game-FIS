import express from 'express'
import cors from 'cors'

const app = express()
const port = 8080

app.use(cors())

async function getRandomMonster() {
	const res = await fetch(
		'https://app.pixelencounter.com/api/basic/monsters/random/json'
	)
	return res.json()
}

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.get('/monster/random', async (req, res) => {
	res.send(await getRandomMonster())
})

app.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`)
})
