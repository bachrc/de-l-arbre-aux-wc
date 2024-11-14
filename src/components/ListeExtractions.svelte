<script lang="ts">
  import { getExtractions, type Extraction } from '$lib/extractions';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Pagination from './Pagination.svelte';
  import ResumeExtraction from './ResumeExtraction.svelte';

  let extractions: Extraction[] = $state([]);
  let pageEnCours = $derived(parseInt($page.url.searchParams.get('page') ?? '1'));
  let elementsParPage = $derived(parseInt($page.url.searchParams.get('elementsParPage') ?? '3'));
  let totalPages = $state(0);

  $effect(() => {
    getExtractions(pageEnCours, elementsParPage).then((data) => {
      extractions = data.items as Extraction[];
      totalPages = data.totalPages;
    });
  });
</script>

<div class="w-full flex flex-col">
  <div class="flex flex-row items-center h-12 rounded-3xl bg-white border">
    <input type="text" class="grow h-full rounded-l-3xl px-4 border-r" />
    <span class="px-2">🔍</span>
  </div>
  {#each extractions as extraction}
    <ResumeExtraction extraction={extraction as Extraction} />
  {/each}

  <div>
    <Pagination page={pageEnCours} {totalPages} />
  </div>
</div>
