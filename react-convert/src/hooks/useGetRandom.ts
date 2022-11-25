import React, { useState, useEffect } from 'react'
import { fetchRandomMonster } from '../api/monsterApi'

export default function useGetRandom() {
	const [patternData, setPatternData] = useState<number[][]>([])
	const [colorData, setColorData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	async function randomMonster() {
		const data = await fetchRandomMonster()
		console.log(data)
		setPatternData(data.pattern)
		setColorData(data.colors)
		setIsLoading(false)
	}

	useEffect(() => {
		randomMonster()
	}, [])

	return { patternData, colorData, isLoading, randomMonster }
}
