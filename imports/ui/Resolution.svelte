<script>
  import { Resolutions } from '../api/resolutions'
  export let key
  export let resolution

  function deleteThisResolution() {
    Meteor.call('resolutions.remove', resolution._id)
  }
  function toggleChecked() {
    Meteor.call('resolutions.setChecked', resolution._id, !resolution.checked)
  }
</script>

<li>
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

  <button on:click={deleteThisResolution}>Delete</button>
</li>