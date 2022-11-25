type Props = {
	pattern: number[][]
	colors: string[]
}

const Monster = ({ pattern, colors }: Props) => {
	return (
		<div>
			{pattern.map((row, index) => {
				return (
					<div key={index} className='row'>
						{row.map((cell, index) => {
							return (
								<div
									key={index}
									className='cell'
									style={{ backgroundColor: `${colors[cell]}` }}
								/>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
export default Monster
