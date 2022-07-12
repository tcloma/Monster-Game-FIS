const pixelCanvas = document.querySelector('.canvas')
const inputFields = document.querySelector('#input-fields')
const pColorInput = document.querySelector('#pColor-input')
const sColorInput = document.querySelector('#sColor-input')
const fillDropDown = document.querySelector('#fill-type')
const generateButton = document.querySelector('#generate-monster-button')
const randomButton = document.querySelector('#random-monster')
const confirmButton = document.querySelector('#confirm-monster')
const monsNameContainer = document.querySelector('#mons-name')

let primaryColor
let secondaryColor
let filltype
let monsterUrl
let monsterName

let renderPixels = (data) => {
    pixelCanvas.innerHTML = ""

    let localPattern = [];
    let colorValue = data.pattern;
    let colorGrab = data.colors;
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
            if (monsterUrl !== 'https://app.pixelencounter.com/api/basic/monsters/random/json') {
                if (element === 1) {
                    pixel.style.backgroundColor = `#${primaryColor}`
                }
                else if (element === 2) {
                    pixel.style.backgroundColor = `#${secondaryColor}`
                }
            }
            else{
                if (element === 1){
                    pixel.style.backgroundColor = colorGrab[1]
                }
            }

            pixelCanvas.append(pixel)
        })
    })
}

const fetchData = async () => {
    let req = await fetch(monsterUrl)
    let res = await req.json()
    renderPixels(res)
}

const fetchRandom = async () => {
    let req = await fetch('https://app.pixelencounter.com/api/basic/monsters/random/json')
    let res = await req.json()
    renderPixels(res)
}

generateButton.addEventListener('click', () => {
    primaryColor = pColorInput.value
    secondaryColor = sColorInput.value
    filltype = fillDropDown.value
    monsterUrl = `https://app.pixelencounter.com/api/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondarycColor=%23${secondaryColor}&fillType=${filltype}`

    // console.log(primaryColor, secondaryColor, filltype, monsterUrl)
    event.preventDefault()
    fetchData()
})

randomButton.addEventListener('click', () => {
    monsterUrl = 'https://app.pixelencounter.com/api/basic/monsters/random/json'
    event.preventDefault()
    fetchRandom()
})

confirmButton.addEventListener('click', () => {
    let decision = confirm('Do you want to summon this monster?')
    
    if (decision === true){
        console.log('Okay then!')
        monsterName = prompt("Enter your monster's name!")
        inputFields.remove()
        monsNameContainer.textContent = monsterName
        // Call new scene
    }
    else {
        console.log('Take your time!')
    }

    event.preventDefault()
})