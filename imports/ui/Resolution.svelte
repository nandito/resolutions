<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Resolutions } from '../api/resolutions'
  export let key
  export let resolution
  let showPrivateButton

  function deleteThisResolution() {
    Meteor.call('resolutions.remove', resolution._id)
  }
  function toggleChecked() {
    Meteor.call('resolutions.setChecked', resolution._id, !resolution.checked)
  }
  function tooglePrivate() {
    Meteor.call('resolutions.setPrivate', resolution._id, !resolution.private)
  }

  $: currentUser = useTracker(() => Meteor.user())
  $: {
    showPrivateButton = false
    if ($currentUser) {
      showPrivateButton = resolution.owner === $currentUser._id
    }
  }
</script>

<li
  class:checked="{resolution.checked}"
  class:private="{resolution.private}"
>
  <input
    type="checkbox"
    readonly
    checked={resolution.checked}
    on:click={toggleChecked}
  >

  <span>
    {#if resolution.username}
      <strong>{resolution.username}: </strong>
    {/if}
    {resolution.title}
  </span>

  {#if showPrivateButton}
    <button on:click={tooglePrivate}>
      {resolution.private ? 'Make public' : 'Make private'}
    </button>
  {/if}

  <button on:click={deleteThisResolution}>Delete</button>
</li>