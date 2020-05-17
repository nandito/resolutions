<script>
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration'
  import { onMount } from 'svelte'
  import { Resolutions } from '../api/resolutions'
  import Resolution from './Resolution.svelte'

  let currentUser
  let resolutions = []
  let newResolution = ''
  let hideChecked = false

  onMount(async () => {
    Meteor.subscribe('resolutions')
  })

  function handleSubmit() {
    Meteor.call('resolutions.insert', newResolution)

    newResolution = ''
  }

  // Get the information about the currently logged in user
  $: currentUser = useTracker(() => Meteor.user())

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

  <BlazeTemplate template="loginButtons" />

  {#if $currentUser}
    <form on:submit|preventDefault={handleSubmit}>
      <input
        type="text"
        placeholder="New resolution"
        bind:value={newResolution}
      >
    </form>
  {/if}

  <ul>
    {#each resolutions as resolution}
      <Resolution
        key={resolution._id}
        resolution={resolution}
      />
    {/each}
  </ul>
</header>
