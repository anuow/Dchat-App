<!-- src/App.svelte -->
<script>
  import { onMount } from 'svelte';
  import Chat from './Chat.svelte';
  import { alias, recallSession, signup, signin, logout } from './user';

  import { get } from 'svelte/store';

  let name = '';
  let pass = '';
  let cur = '';

  onMount(() => {
    recallSession();
    alias.subscribe(v => cur = v);
  });

  async function doSignup() {
    try { await signup(name.trim(), pass); name=''; pass=''; } catch(e) { alert(e); }
  }

  async function doLogin() {
    try { await signin(name.trim(), pass); name=''; pass=''; } catch(e) { alert(e); }
  }
</script>

<header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
  <div><h2>DChat – Decentralized Chat</h2></div>
  <div>
    {#if cur}
      <span style="margin-right:1rem">Logged in: <strong>{cur}</strong></span>
      <button on:click={logout}>Logout</button>
    {:else}
      <input placeholder="username" bind:value={name} />
      <input placeholder="password" bind:value={pass} type="password" />
      <button on:click={doLogin}>Login</button>
      <button on:click={doSignup}>Sign up</button>
    {/if}
  </div>
</header>

<main>
  <Chat />
</main>
