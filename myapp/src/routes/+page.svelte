<script>
  import Toggle from "./toggle.svelte";
	import Table_input from './tableInput.svelte';
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
    <div class="col d-flex justify-content-end">
      <Toggle on:change={e => selectedToggle = e.detail} />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <Table title={"My Availability"} />
      <!-- <Table_input title={"My Availability"} isWriteable={true}/> -->
    </div>
    <div class="col">
      {#if selectedToggle === 'Availability'}
        <Table title={"Group Availability"} />
        <!-- <Table_input title={"Group Availability"} isWriteable={false} /> -->
      {:else if selectedToggle === 'Preferences'}
        <Table title={"Preferences"} />
      {/if}
    </div>
  </div>
</div>
