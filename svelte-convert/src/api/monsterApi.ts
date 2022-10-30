export const fetchRandomMonster = async () => {
   const res = await fetch('https://app.pixelencounter.com/api/basic/monsters/random/json')
   return res.json()
}