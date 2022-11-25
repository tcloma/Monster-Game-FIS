import React from 'react'
import useGetRandom from './hooks/useGetRandom'
import './App.css'
import Monster from './components/Monster'

const { log, table } = console

function App() {
	const { patternData, colorData, isLoading, randomMonster } = useGetRandom()

	return (
		<div className='App'>
			<h1> Kaijugochi! </h1>
			<button onClick={randomMonster}> Randomize </button>
			{isLoading ? (
				<p> Loading... </p>
			) : (
				<Monster pattern={patternData} colors={colorData} />
			)}
		</div>
	)
}

export default App
