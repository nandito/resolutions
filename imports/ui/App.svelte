<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Resolutions } from '../api/resolutions'
  import Resolution from './Resolution.svelte'

  let resolutions = []
  let newResolution = ''
  let hideChecked = false

  function handleSubmit() {
    Resolutions.insert({
      title: newResolution,
      createdAt: new Date()
    })

      newResolution = ''
  }

  $: uncheckedCount = useTracker(() => Resolutions.find({ checked: {$ne: true }}).count())

  const resolutionStore = Resolutions.find({},{ sort: { createdAt: -1 } })
  $: {
    resolutions = $resolutionStore
    if (hideChecked) {
      resolutions = resolutions.filter(resolution => !resolution.checked)
    }
  }
</script>

<header>
  <h1>Resolutions ({ $uncheckedCount })</h1>

  <label for="hide-checked">
    <input
      name="hide-checked"
      type="checkbox"
      bind:checked={hideChecked}
    >
    Hide checked resolutions
  </label>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      placeholder="New resolution"
      bind:value={newResolution}
    >
  </form>

  <ul>
    {#each resolutions as resolution}
      <Resolution
        key={resolution._id}
        resolution={resolution}
      />
    {/each}
  </ul>
</header>
