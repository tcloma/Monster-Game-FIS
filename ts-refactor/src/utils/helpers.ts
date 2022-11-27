const select = document.querySelector.bind(document)
const create = document.createElement.bind(document)

function make(type: string, params: any, content = '') {
	const element = create(type)

	for (const prop in params) {
		element[prop as keyof HTMLElement] = params[prop]
	}

	element.textContent = content

	return element
}

export { select, create, make }
