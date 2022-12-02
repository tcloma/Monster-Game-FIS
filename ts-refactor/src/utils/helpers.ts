const select = document.querySelector.bind(document)
const create = document.createElement.bind(document)

function make(type: string, params: any, content = '', event = []) {
	const element = create(type)

	for (const prop in params) {
		element[prop as keyof HTMLElement] = params[prop]
	}

	element.textContent = content
	if (event.length !== 0) element.addEventListener(event[0], () => event[1]())

	return element
}

export { select, create, make }
