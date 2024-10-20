<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/database';
  import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  pb.authStore.clear();

  onMount(() => {
    goto('/');
  });
</script>
