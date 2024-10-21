<script lang="ts">
  import { pb } from '$lib/database';
  import { getExtractions, type Extraction } from '$lib/extractions';
  import ResumeExtraction from './ResumeExtraction.svelte';

  let data = getExtractions(1, 20);
</script>

<div class="w-full flex flex-col">
  {#await data}
    <span>Chargement des cafés...</span>
  {:then extractions}
    {#each extractions.items as extraction}
      <ResumeExtraction extraction={extraction as Extraction} />
    {/each}
  {/await}
</div>
