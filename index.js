const pixelCanvas = document.querySelector('.canvas')
const indivPixels = document.querySelectorAll('.pixel')
const inputFields = document.querySelector('#input-fields')
const topButtons = document.querySelector('#buttons')
const bottomUI = document.querySelector('.bottom-ui')
const header = document.querySelector('#header')
const gameContent = document.querySelector('#gameContent')

const pColorInput = document.querySelector('#pColor-input')
const sColorInput = document.querySelector('#sColor-input')
const fillDropDown = document.querySelector('#fill-type')

const generateButton = document.querySelector('#generate-monster-button')
const randomButton = document.querySelector('#random-monster')
const confirmButton = document.querySelector('#confirm-monster')
const monsNameContainer = document.querySelector('#mons-name')

const leftSidePlay = document.querySelector('.left-field')
const rightSidePlay = document.querySelector('.right-field')

const pixelgroup1 = document.querySelector('#pixelgroup1')
const pixelgroup2 = document.querySelector('#pixelgroup2')
const pixelgroup3 = document.querySelector('#pixelgroup3')
const pixelgroup4 = document.querySelector('#pixelgroup4')
const pixelgroup5 = document.querySelector('#pixelgroup5')
const pixelgroup6 = document.querySelector('#pixelgroup6')

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
    let rowcounter = 0;
    let rowgrouper = 1;
    // let boxCount = 1;

    colorValue.forEach((element, i) => {
        localPattern.push(element)
        // console.log(`Pattern ${i}:`, localPattern[i])

        localPattern[i].forEach((element) => {
            // console.log(element)
            let pixel = document.createElement('div')
            pixel.className = "pixel"
            // if (rowcounter !== 23){
            //     pixel.id = `pixelgroup${rowgrouper}`
            //     rowcounter++;
            //     // console.log(rowcounter)
            //     // console.log(rowgrouper)
            // }
            // else {
            //     pixel.id = `pixelgroup${rowgrouper}`
            //     rowcounter = 0;
            //     rowgrouper++;
            // }
            // pixel.innerText = boxCount
            // pixel.style.color = "white"
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
    try {
        let req = await fetch(monsterUrl)
        let res = await req.json()
        renderPixels(res)
    }
    catch (error) {
        alert('Entered an invalid Color Code, please try again!')
    }
}

const fetchRandom = async () => {
    let req = await fetch('https://app.pixelencounter.com/api/basic/monsters/random/json')
    let res = await req.json()
    renderPixels(res)
}

generateButton.addEventListener('click', () => {

    if (primaryColor !== "" && fillDropDown.value !== "none") {
        primaryColor = pColorInput.value
        secondaryColor = sColorInput.value
        filltype = fillDropDown.value
        monsterUrl = `https://app.pixelencounter.com/api/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondarycColor=%23${secondaryColor}&fillType=${filltype}`

        // console.log(primaryColor, secondaryColor, filltype, monsterUrl)
        event.preventDefault()
        fetchData()
    }
    else {
        alert('Please enter colors and render type before creating!')
    }
})

randomButton.addEventListener('click', () => {
    monsterUrl = 'https://app.pixelencounter.com/api/basic/monsters/random/json'
    event.preventDefault()
    fetchRandom()
})

confirmButton.addEventListener('click', () => {
    let decision = confirm('Do you want to summon this monster?')

    if (decision === true) {
        // console.log('Okay then!')
        monsterName = prompt("Enter your monster's name!")
        if (monsterName != "") {
            monsNameContainer.textContent = monsterName
            renderPart2()
        }
        else {
            alert('Please enter a name for your monster!')
        }
        // Call new scene
    }
    else {
        alert('Please enter a name for your monster!')
    }

    event.preventDefault()
})

let baseTime = 10
let size = 250
let sacrificed = 0;

const emptyDiv = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

const renderPart2 = () => {
    emptyDiv(inputFields)
    emptyDiv(topButtons)
    emptyDiv(bottomUI)

    let monstersFed = document.createElement('h4')
    let outer = document.createElement('div')
    let inner = document.createElement('div')
    let feedBtn = document.createElement('button')
    let tutorialBtn = document.createElement('button')

    monstersFed.textContent = "0 monsters eaten"
    feedBtn.textContent = "Feed your monster!"
    feedBtn.className = "feedbtn"
    tutorialBtn.textContent = "How to play?"
    tutorialBtn.className = "tutorialbtn"
    outer.id = "progress-bar"
    inner.id = "progress-inner"

    feedBtn.addEventListener('click', () => {
        feedBtn.remove()
        tutorialBtn.remove()
        inputFields.append(monstersFed)
        let cooldown = 3
        let gamespeed = 1800

        let timerDrain = () => {
            baseTime--;
            cooldown--;

            if (gamespeed > 1000) {
                gamespeed = gamespeed - 30
            }

            console.log('Current gamespeed is: ', gamespeed)
            console.log('Current mosnter size is: ', size)

            let progressTrack = (baseTime / 10) * 100;

            if (baseTime > -1) {
                setTimeout(timerDrain, gamespeed)
                // console.log('works')
                inner.style.width = progressTrack + "%"
            }
            else {
                console.log('Monster Killed')
                killGame()
            }

            let sideRender = Math.floor(Math.random() * 2)
            let foodImage = `https://app.pixelencounter.com/api/basic/monsters/random/png?size=${size}`
            console.log('New monster in:', cooldown)

            if (sideRender === 0 && cooldown === 0) {
                let monsterFood = document.createElement('img')
                monsterFood.src = foodImage
                monsterFood.className = "food"

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
                    sacrificed++
                    monstersFed.textContent = `${sacrificed} monsters eaten`
                })

                leftSidePlay.append(monsterFood)
            }
            else if (sideRender === 1 && cooldown === 0) {
                let monsterFood = document.createElement('img')
                monsterFood.src = foodImage
                monsterFood.className = "food"

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
                    sacrificed++
                    monstersFed.textContent = `${sacrificed} monsters eaten`
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

    tutorialBtn.addEventListener('click', () => {
        alert("The red bar on the bottom indicates your monster's hunger, it will slowly drain as long as the game continues")
        alert("Random smaller monster will appear on the left and right side of your monster")
        alert("Click on those monsters to feed them to your monster and replenish the hunger bar")
        alert("The game will end when your hunger bar reaches is fully depleted")
        alert("Goodluck! Keep your monster full and happy! (◕‿◕)")

        event.preventDefault()
    })

    topButtons.append(tutorialBtn)
    inputFields.append(feedBtn)
    outer.append(inner)
    bottomUI.append(outer)
}

const deathAnimation = () => {
    pixelCanvas.style.animationPlayState = "paused"
    gameContent.style.animationPlayState = "running"
    gameContent.addEventListener('animationend', endTextRender)
}

const killGame = () => {
    bottomUI.remove()
    deathAnimation()
}

const endTextRender = () => {

    pixelCanvas.remove()
    leftSidePlay.remove()
    rightSidePlay.remove()
    gameContent.style.opacity = "1"

    let endtitle = document.createElement('h1')
    endtitle.id = "end"
    endtitle.textContent = `${monsterName} died`

    gameContent.append(endtitle)
    gameContent.removeEventListener('animationend', endTextRender)
}