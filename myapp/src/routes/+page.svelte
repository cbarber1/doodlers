<script>
  import Toggle from "./toggle.svelte";
  import Table from './table.svelte';
  import clock from '../lib/assets/clock.png';

  let selectedToggle = "Availability";
</script>


<h3 class="text-center p-3">
  <!-- Attribution: <a href="https://www.flaticon.com/free-icons/time-and-date" title="time and date icons">Time and date icons created by Iconic Panda - Flaticon</a> -->
  <img src={clock} alt="Clock Icon" style="width: 32px; height: 32px; margin-right: 5px; margin-bottom: 6px; padding: 0;">
  Prefer2Meet
</h3>

<div class="container">
  <div class="row">
    <div class="col">
      <Table title={"My Availability"} />
    </div>
    <div class="col">
      <div class="col text-center">
        <Toggle on:change={e => selectedToggle = e.detail} />
      </div>
      {#if selectedToggle === 'Availability'}
        <Table title={"Group Availability"} />
      {:else if selectedToggle === 'Preferences'}
        <Table title={"Preferences"} />
      {/if}
    </div>
  </div>
</div>

<style>
  h1 {
    margin-top: 50px;
  }
</style>
