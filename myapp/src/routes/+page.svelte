<script>
	import Table_input from './Table_input.svelte';
    import Toggle from "../lib/toggle.svelte";
</script>

<h1 class="text-center p-4">Doodlers Epic Page</h1>

<div class="container">
  <div class="row">
    <div class="col d-flex justify-content-end m-4">
      <Toggle />
    </div>
  </div>
  <div class="row">
    <div class="col">
    <Table_input title={"My Availability"} isWriteable={true}/>
    </div>
    <div class="col">
    <Table_input title={"Group's Availability"} isWriteable={false} />
    </div>
  </div>
</div>
