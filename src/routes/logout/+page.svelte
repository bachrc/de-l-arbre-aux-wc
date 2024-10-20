<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/database';

  pb.authStore.clear();

  goto('/');
</script>
