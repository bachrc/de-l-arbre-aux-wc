<script lang="ts">
  import type { Extraction } from '$lib/extractions';
  import { toPrettyDateTime } from '$lib/time';

  let props: {
    extraction: Extraction;
  } = $props();
</script>

<div class="w-full p-2 flex flex-col gap-2">
  <div class="flex flex-col">
    <a href="/extractions/{props.extraction.id}">
      <h1 class="text-lg">{props.extraction.nom}</h1>
    </a>
    <span class="text-xs">Dernière MàJ le {toPrettyDateTime(props.extraction.updated)}</span>
  </div>
</div>
