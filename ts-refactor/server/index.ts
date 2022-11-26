import express from 'express'
import cors from 'cors'

const app = express()
const port = 8080

app.use(cors())

const baseUrl = 'https://app.pixelencounter.com/api/basic'

async function getRandomMonster() {
	const res = await fetch(baseUrl + '/monsters/random/json')
	return res.json()
}

async function getCustomMonster(
	color1: string,
	color2: string,
	fillType: string
) {
	const res = await fetch(
		baseUrl +
			`/svgmonsters/json?primaryColor=%23${color1}&secondaryColor=%23${color2}&fillType=${fillType}`
	)
	return res.json()
}

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.get('/monster/random', async (req, res) => {
	res.send(await getRandomMonster())
})

app.get('/monster/custom', async (req, res) => {
	const { primaryColor, secondaryColor, fillType } = req.query
	console.log({ primaryColor, secondaryColor, fillType })
	res.send(
		await getCustomMonster(
			primaryColor as string,
			secondaryColor as string,
			fillType as string
		)
	)
})

app.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`)
})
