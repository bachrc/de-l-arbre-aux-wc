<script lang="ts">
  import { createRawSnippet, type Snippet } from 'svelte';
  import Loader from './Loader.svelte';

  let confirmationApparente = $state(false);

  let props: {
    children: Snippet;
    loading?: boolean;
    customClass?: string;
    confirmation?: string;
    onclick: () => void;
  } = $props();

  function clic() {
    if (!props.confirmation) {
      return props.onclick();
    }

    if (!confirmationApparente) {
      confirmationApparente = true;
      return;
    }

    props.onclick();
  }
</script>

<button
  class="w-full
        py-3
        rounded-lg
        hover:shadow-md
        disabled:hover:shadow-none
        flex
        flex-row
        gap-2
        justify-center
        items-center
        h-12
        {props.customClass}
        "
  disabled={props.loading}
  onclick={clic}
>
  {#if props.loading}
    <Loader />
  {/if}
  {#if confirmationApparente}
    <span>{props.confirmation}</span>
  {:else}
    <span>{@render props.children()}</span>
  {/if}
</button>
