<script lang="ts">
   import { onMount } from 'svelte'
   import { fetchRandomMonster } from '../api/monsterApi'
   import Monster from '../lib/Monster.svelte'

   let patternData: Array<Array<number>> = []
   let name: string = ''

   onMount(() => {
      fetchNewRandom()
   })

   const fetchNewRandom = async () => {
      const data = await fetchRandomMonster()
      patternData = data.pattern
      console.log(patternData)
   }
</script>

<main class="page">
   <div
      class="bg-zinc-700 w-2/3 lg:w-1/2 h-max rounded-md flex flex-col items-center justify-center gap-4"
   >
      <h1 class="text-5xl font-bold">Monster Generator</h1>
      {#if name === ''}
         <h1>Name</h1>
      {:else}
         {name}
      {/if}
      <Monster {patternData} />
      <button on:click={fetchNewRandom} class="bg-zinc-900 p-4 rounded-md">
         Random
      </button>
      <button class="bg-zinc-900 p-4 rounded-md"> Set Name </button>
      <input
         bind:value={name}
         type="text"
         placeholder="Enter name..."
         class="p-2 text-black"
      />
   </div>
</main>
