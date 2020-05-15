<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Resolutions } from '../api/resolutions'

  let newResolution = ''

  function handleSubmit() {
    Resolutions.insert({
      title: newResolution,
      createdAt: new Date()
    })

      newResolution = ''
  }

  $: resolutions = useTracker(() => Resolutions.find(
    {},
    { sort: { createdAt: -1 } }
  ).fetch())
</script>

<header>
  <h1>Yo! Yo!</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      placeholder="New resolution"
      bind:value={newResolution}
    >
  </form>

  {#each $resolutions as resolution}
    <h2>{resolution.title}</h2>
  {/each}
</header>
