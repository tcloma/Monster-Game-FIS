<script lang="ts">
   import { onMount } from 'svelte'
   export let patternData: Array<Array<number>>
</script>

<section>
   {#each patternData as pattern}
      <div class="flex flex-row">
         {#each pattern as tile}
            <div class={tile === 0 ? 'tile' : `tile bg-teal-100`} />
         {/each}
      </div>
   {/each}
</section>
