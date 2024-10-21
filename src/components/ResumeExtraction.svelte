<script lang="ts">
  import type { Extraction } from '$lib/extractions';

  let props: {
    extraction: Extraction;
  } = $props();
</script>

<div class="w-full p-2 flex flex-col">
  <a href="/extractions/{props.extraction.id}">
    <h1 class="text-lg">{props.extraction.nom}</h1>
  </a>
  <span class="text-xs">Le {props.extraction.created}</span>
</div>
