<script lang="ts">
  import { page } from '$app/stores';

  let props: {
    page: number;
    totalPages: number;
  } = $props();

  function currentUrlWithPage(pageNumber: number): string {
    let params = new URLSearchParams($page.url.searchParams.toString());
    params.set('page', pageNumber.toString());

    return `?${params.toString()}`;
  }

  let pagePrecedente = $derived(props.page - 1);
  let pageSuivante = $derived(props.page + 1);
</script>

<div class="flex flex-row">
  {#if props.page > 1}
    <a href={currentUrlWithPage(pagePrecedente)}><span>⬅️ Page précédente</span></a>
  {/if}

  {#if props.page < props.totalPages}
    <a href={currentUrlWithPage(pageSuivante)}><span>Page suivante ➡️</span></a>
  {/if}
</div>
