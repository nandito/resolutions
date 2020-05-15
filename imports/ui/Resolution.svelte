<script>
  import { Resolutions } from '../api/resolutions'
  export let key
  export let resolution

  function deleteThisResolution() {
    Resolutions.remove(resolution._id)
  }
  function toggleChecked() {
    Resolutions.update(resolution._id, {
      $set: {
        checked: !resolution.checked,
      }
    })
  }
</script>

<li>
  <input
    type="checkbox"
    readonly
    checked={resolution.checked}
    on:click={toggleChecked}
  >

  <span>{resolution.title}</span>

  <button on:click={deleteThisResolution}>Delete</button>
</li>