const select = document.querySelector.bind(document)
const create = document.createElement.bind(document)

function make(type: string, className: string, content = '') {
	const element = create(type)

	element.className = className
	element.textContent = content

	return element
}

export { select, create, make }
