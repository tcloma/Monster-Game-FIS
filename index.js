const pixelCanvas = document.querySelector('.canvas')
const inputFields = document.querySelector('#input-fields')
const topButtons = document.querySelector('#buttons')
const bottomUI = document.querySelector('.bottom-ui')
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
            else {
                if (element === 1) {
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

    if (decision === true) {
        console.log('Okay then!')
        monsterName = prompt("Enter your monster's name!")
        monsNameContainer.textContent = monsterName
        renderPart2()
        // Call new scene
    }
    else {
        console.log('Take your time!')
    }

    event.preventDefault()
})

let baseTime = 10

const renderPart2 = () => {
    inputFields.remove()
    topButtons.remove()

    let outer = document.createElement('div')
    let inner = document.createElement('div')
    let TestBtn = document.createElement('button')
    let TestBtn2 = document.createElement('button')
    let pHolder = document.createElement('div')

    pHolder.className = "progress-box"
    TestBtn.textContent = "Timer"
    TestBtn2.textContent = "Add Time"
    outer.id = "progress-bar"
    inner.id = "progress-inner"

    TestBtn.addEventListener('click', () => {
        let timerDrain = setInterval(() => {
            baseTime--;

            let progressTrack = (baseTime / 10) * 100;

            if (baseTime > -1) {
                console.log('works')
                inner.style.width = progressTrack + "%"
            }
            else {
                clearInterval(timerDrain)
                console.log('done')
                killGame()
            }

        }, 2000)
    })

    TestBtn2.addEventListener('click', () => {
        baseTime = baseTime + 3;
        console.log('working')
    })

    outer.append(inner)
    bottomUI.append(pHolder, outer, TestBtn, TestBtn2)
}

const killGame = () => {
    bottomUI.remove()
    monsNameContainer.textContent = "Dead"
}