const pixelCanvas = document.querySelector('.canvas')
const pColorInput = document.querySelector('#pColor-input')
const sColorInput = document.querySelector('#sColor-input')
const generateButton = document.querySelector('#generate-monster-button')
const fillDropDown = document.querySelector('#fill-type')
const randomButton = document.querySelector('#random-monster')

let primaryColor
let secondaryColor
let filltype
let monsterUrl

let renderPixels = (data) => {
    pixelCanvas.innerHTML = ""

    let localPattern = [];
    let colorValue = data;
    // let boxCount = 1;

    colorValue.forEach((element, i) => {
        localPattern.push(element)
        // console.log(`Pattern ${i}:`, localPattern[i])

        localPattern[i].forEach((element) => {
            // console.log(element)
            let pixel = document.createElement('div')
            pixel.className = "pixel"
            // pixel.innerText = boxCount
            // boxCount++;

            if (element === 1) {
                pixel.style.backgroundColor = `#${primaryColor}`
            }
            else if (element === 2) {
                pixel.style.backgroundColor = `#${secondaryColor}`
            }

            pixelCanvas.append(pixel)
        })
    })
}

const fetchData = async () => {
    let req = await fetch(monsterUrl)
    let res = await req.json()
    renderPixels(res.pattern)
}

// const fetchRandom = async () => {
//     let req = await fetch('https://app.pixelencounter.com/api/basic/monsters/random/json')
//     let res = await req.json()
//     console.log(res)
// }

generateButton.addEventListener('click', () => {
    primaryColor = pColorInput.value
    secondaryColor = sColorInput.value
    filltype = fillDropDown.value

    monsterUrl = `https://app.pixelencounter.com/api/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondarycColor=%23${secondaryColor}&fillType=${filltype}`

    // console.log(primaryColor, secondaryColor, filltype, monsterUrl)
    event.preventDefault()
    fetchData()
})

// randomButton.addEventListener('click', () => {
//     event.preventDefault()
//     fetchRandom()
// })