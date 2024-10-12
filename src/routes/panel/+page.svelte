<script lang="ts">
	import { pb } from '$lib/database';
	import { currentUser } from '$lib/login.svelte';
</script>

<h1>Bienvenue</h1>
<p>Tu es {currentUser.mail}, bien joué</p>
