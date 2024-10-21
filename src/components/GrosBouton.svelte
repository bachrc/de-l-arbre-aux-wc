<script lang="ts">
  import type { Snippet } from 'svelte';
  import Loader from './Loader.svelte';

  type Props = {
    children: Snippet;
    loading?: boolean;
    onclick?: () => void;
  };

  let props: Props = $props();
</script>

<button
  class="w-full
        bg-green-300
        disabled:bg-green-100
        py-3
        rounded-lg
        hover:shadow-md
        disabled:hover:shadow-none
        flex
        flex-row
        gap-2
        justify-center
        items-center
        h-12"
  disabled={props.loading}
  onclick={props.onclick}
>
  {#if props.loading}
    <Loader />
  {/if}
  <span>{@render props.children()}</span>
</button>
