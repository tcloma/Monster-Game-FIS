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

const leftSidePlay = document.querySelector('.left-field')
const rightSidePlay = document.querySelector('.right-field')

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
let size = 250

const renderPart2 = () => {
    inputFields.remove()
    topButtons.remove()

    let outer = document.createElement('div')
    let inner = document.createElement('div')
    let TestBtn = document.createElement('button')

    TestBtn.textContent = "Timer"
    outer.id = "progress-bar"
    inner.id = "progress-inner"

    TestBtn.addEventListener('click', () => {

        let cooldown = 3
        let gamespeed = 2000

        let timerDrain = () => {
            baseTime--;
            cooldown--;

            if (gamespeed > 1000) {
                gamespeed = gamespeed - 10
            }

            console.log(gamespeed)
            console.log(size)

            let progressTrack = (baseTime / 10) * 100;

            if (baseTime > -1) {
                setTimeout(timerDrain, gamespeed)
                console.log('works')
                inner.style.width = progressTrack + "%"
            }
            else {
                console.log('done')
                killGame()
            }

            let sideRender = Math.floor(Math.random() * 2)
            let foodImage = `https://app.pixelencounter.com/api/basic/monsters/random/png?size=${size}`
            console.log('New monster in:', cooldown)

            if (sideRender === 0 && cooldown === 0) {
                let monsterFood = document.createElement('img')
                monsterFood.src = foodImage

                monsterFood.addEventListener('click', () => {
                    if (baseTime < 6) {
                        baseTime = baseTime + 4;
                    }
                    else {
                        baseTime = 11
                    }
                    leftSidePlay.innerHTML = ""
                    size = size - 5
                    cooldown = 3
                })

                leftSidePlay.append(monsterFood)
            }
            else if (sideRender === 1 && cooldown === 0) {
                let monsterFood = document.createElement('img')
                monsterFood.src = foodImage

                monsterFood.addEventListener('click', () => {
                    if (baseTime < 6) {
                        baseTime = baseTime + 4;
                    }
                    else {
                        baseTime = 11
                    }
                    rightSidePlay.innerHTML = ""
                    size = size - 5
                    cooldown = 3
                })

                rightSidePlay.append(monsterFood)
            }

            if (cooldown === -1) {
                leftSidePlay.innerHTML = ""
                rightSidePlay.innerHTML = ""
                cooldown = 3
            }
        }
        setTimeout(timerDrain, gamespeed)
    })

    outer.append(inner)
    bottomUI.append(outer, TestBtn)
}

const killGame = () => {
    bottomUI.remove()
    monsNameContainer.textContent = "Dead"
}