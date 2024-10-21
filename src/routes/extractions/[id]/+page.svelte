<script>
  import { page } from '$app/stores';
  import { getExtraction } from '$lib/extractions';

  const data = getExtraction($page.params.id);
</script>

{#await data}
  <span>Bientôt le café</span>
{:then extraction}
  <span>Miam le café : {extraction.nom}</span>
{/await}
