// Main HTML Elements
const header = document.querySelector('#header')
const inputFields = document.querySelector('#input-fields')
const topButtons = document.querySelector('#buttons')
const gameContent = document.querySelector('#gameContent')
const bottomUI = document.querySelector('.bottom-ui')

// Input Field Elements
const pColorInput = document.querySelector('#pColor-input')
const sColorInput = document.querySelector('#sColor-input')
const fillDropDown = document.querySelector('#fill-type')
const monsNameContainer = document.querySelector('#mons-name')

// Monster Render Elements
const pixelCanvas = document.querySelector('.canvas')
const indivPixels = document.querySelectorAll('.pixel')

// Start Screen Buttons
const generateButton = document.querySelector('#generate-monster-button')
const randomButton = document.querySelector('#random-monster')
const confirmButton = document.querySelector('#confirm-monster')

// Gameplay Fields
const leftSidePlay = document.querySelector('.left-field')
const rightSidePlay = document.querySelector('.right-field')

// Global Variables
let primaryColor
let secondaryColor
let filltype
let monsterUrl
let monsterName

// Fetching custom monster data from API
const fetchData = async () => {
   try {
      let req = await fetch(monsterUrl)
      let res = await req.json()
      renderPixels(res)
   }
   catch (error) { /* Error catching for invalid URL */
      alert('Entered an invalid Color Code, please try again!')
   }
}

// Fetching random monster data from API
const fetchRandom = async () => {
   let req = await fetch('https://app.pixelencounter.com/api/basic/monsters/random/json')
   let res = await req.json()
   renderPixels(res)
}

// Render monster using data from API
let renderPixels = (data) => {
   pixelCanvas.innerHTML = ""

   // Grabbing pattern data and color data from API
   let localPattern = [];
   let colorValue = data.pattern;
   let colorGrab = data.colors;
   // let boxCount = 1;

   // Combining pattern data into a single array
   colorValue.forEach((element, i) => {
      localPattern.push(element)
      console.log(`Pattern ${i}:`, localPattern[i])

      // Itirating over pattern array, rendering each element
      localPattern[i].forEach((element) => {
         console.log(element)
         let pixel = document.createElement('div')
         pixel.className = "pixel"
         // pixel.innerText = boxCount
         // pixel.style.color = "white"
         // boxCount++;

         // Checking if renderPixels() was called from the custom or random fetch
         if (monsterUrl !== 'https://app.pixelencounter.com/api/basic/monsters/random/json') {
            if (element === 1) { /* Grabbing custom color data and setting pixel color */
               pixel.style.backgroundColor = `#${primaryColor}`
            }
            else if (element === 2) {
               pixel.style.backgroundColor = `#${secondaryColor}`
            }
         }
         else {
            if (element === 1) { /* Grabbing randomly generated color data and setting pixel color */
               pixel.style.backgroundColor = colorGrab[1]
            }
         }

         pixelCanvas.append(pixel)
      })
   })
}

// Take values from input fields and fetch data using custom URL; Call fetchData()
generateButton.addEventListener('click', () => {
   // Check if input fields have content
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

// Set URL to give return a random monster; Call fetchRandom()
randomButton.addEventListener('click', () => {
   monsterUrl = 'https://app.pixelencounter.com/api/basic/monsters/random/json'
   event.preventDefault()
   fetchRandom()
})

// Change website to pre-gameplay scene
confirmButton.addEventListener('click', () => {
   let decision = confirm('Do you want to summon this monster?')

   if (decision === true) {
      // Naming monster and calling pre-gameplay scene
      monsterName = prompt("Enter your monster's name!")
      if (monsterName != "") {
         monsNameContainer.textContent = monsterName
         renderPart2()
      }
      else {
         alert('Please enter a name for your monster!')
      }
   }
   else {
      alert('Hit ok when you are ready!')
   }

   event.preventDefault()
})


// Function to remove all child nodes within a div
const emptyDiv = (div) => {
   while (div.firstChild) {
      div.removeChild(div.firstChild);
   }
}

// Global variables only used in part 2
let baseTime = 10
let size = 250
let sacrificed = 0;

const renderPart2 = () => {
   emptyDiv(inputFields)
   emptyDiv(topButtons)
   emptyDiv(bottomUI)

   // Creating pre-gameplay elements
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

   // Quick tutorial sequence
   tutorialBtn.addEventListener('click', () => {
      alert("The red bar on the bottom indicates your monster's hunger, it will slowly drain as long as the game continues")
      alert("Random smaller monster will appear on the left and right side of your monster")
      alert("Click on those monsters to feed them to your monster and replenish the hunger bar")
      alert("The game will end when your hunger bar reaches is fully depleted")
      alert("Goodluck! Keep your monster full and happy! (◕‿◕)")

      event.preventDefault()
   })

   // Start gameplay button
   feedBtn.addEventListener('click', () => {
      feedBtn.remove()
      tutorialBtn.remove()
      inputFields.append(monstersFed)
      let cooldown = 3 /* Monster spawn cooldown */
      let gamespeed = 1800

      // Gameplay Function
      let timerDrain = () => {
         baseTime--;
         cooldown--;

         // Decreasing gamespeed by 100ms every increment, capping at 1000ms
         if (gamespeed > 1000) {
            gamespeed = gamespeed - 100
         }

         console.log('Current gamespeed is: ', gamespeed)
         console.log('Current mosnter size is: ', size)

         let progressTrack = (baseTime / 10) * 100;

         // Check if timer is above zero, if not end the game
         if (baseTime > -1) {
            setTimeout(timerDrain, gamespeed)
            inner.style.width = progressTrack + "%"
         }
         else {
            console.log('Monster Killed')
            killGame()
         }

         // Randomly generate a number that decides which side small mosnter renders
         let sideRender = Math.floor(Math.random() * 2)
         let foodImage = `https://app.pixelencounter.com/api/basic/monsters/random/png?size=${size}`
         console.log('New monster in:', cooldown)

         // Checks which side to render monster on, and if monster cooldown is 0
         if (sideRender === 0 && cooldown === 0) {
            let monsterFood = document.createElement('img')
            monsterFood.src = foodImage
            monsterFood.className = "food"

            // Adds on click function to monster that: Increases time, decreases monster size, resets cooldown,
            // tracks number of monsters clicked, and removes monster from DOM
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


   topButtons.append(tutorialBtn)
   inputFields.append(feedBtn)
   outer.append(inner)
   bottomUI.append(outer)
}

// End gameplay scene
const killGame = () => {
   bottomUI.remove()
   pixelCanvas.style.animationPlayState = "paused"
   gameContent.style.animationPlayState = "running"
   gameContent.addEventListener('animationend', endTextRender)
}

// Render death text at the end
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