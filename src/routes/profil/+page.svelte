<script lang="ts">
  import { pb } from '$lib/database';
  import { currentUser } from '$lib/login.svelte';

  pb.collection('users').authRefresh();
</script>

<div class="p-2">
  <h1 class="text-2xl">Profil</h1>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <span class="text-xs font-bold">Nom</span>
      <span>{currentUser.value.name}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-bold">Pseudonyme</span>
      <span>{currentUser.value.username}</span>
    </div>
    <div class="flex flex-col">
      <span class="text-xs font-bold">Adresse mail</span>
      <span>{currentUser.value.email}</span>
    </div>
  </div>
</div>
