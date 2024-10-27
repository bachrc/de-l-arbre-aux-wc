<script lang="ts">
  import type { Extraction } from '$lib/extractions';
  import { renduDeVerdict, serialisationDeVerdict } from '$lib/verdict';

  let props: {
    extraction: Extraction;
  } = $props();

  let verdictFinal = $state('');
  let mauvaisPoints = $state(0);

  $effect(() => {
    const verdict = renduDeVerdict(props.extraction);

    let compteurMauvaisPoints = 0;
    if (verdict.force !== 'optimale') {
      compteurMauvaisPoints++;
    }
    if (verdict.intensiteExtraction !== 'bien extrait') {
      compteurMauvaisPoints++;
    }

    mauvaisPoints = compteurMauvaisPoints;

    verdictFinal = serialisationDeVerdict(verdict);
  });

  const couleursDeReussite: { [mauvaisPoint: number]: string } = {
    0: 'bg-green-100',
    1: 'bg-orange-100',
    2: 'bg-red-100'
  };
</script>

<span class="w-full rounded-3xl p-4 {couleursDeReussite[mauvaisPoints]}">
  {verdictFinal}
</span>
