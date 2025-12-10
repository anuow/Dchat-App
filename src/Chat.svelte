<!-- src/Chat.svelte -->
<script>
  import { onMount } from 'svelte';
  import { gun } from './gun';
  import { alias } from './user';
  import { get } from 'svelte/store';

  let text = '';
  let messages = [];

  const chat = gun.get('chat/public/general/messages');

  onMount(() => {
    // map() + on() to get live updates; .map().on sorts through nodes
    chat.map().on((data, id) => {
      if (!data) return;
      // avoid duplicates: use id + ts as key
      messages = [...messages, { id, from: data.from, text: data.text, ts: data.ts }];
      // keep recent messages in memory (optional: limit length)
      if (messages.length > 1000) messages.shift();
    });
  });

  function send() {
    if (!text.trim()) return;
    const from = get(alias) || 'anon';
    chat.set({ from, text: text.trim(), ts: Date.now() });
    text = '';
  }
</script>

<div>
  <div style="height:400px; overflow:auto; border:1px solid #ccc; padding:8px;">
    {#each messages as m (m.id)}
      <div><strong>{m.from}:</strong> {m.text} <small>· {new Date(m.ts).toLocaleTimeString()}</small></div>
    {/each}
  </div>

  <input bind:value={text} placeholder="message..." on:keydown={(e)=> e.key==='Enter' && send()} />
  <button on:click={send}>Send</button>
</div>
