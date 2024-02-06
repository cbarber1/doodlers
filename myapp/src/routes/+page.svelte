<script>
	import Table_input from './Table_input.svelte';
</script>

<h1 class="text-center p-4">Doodlers Epic Page</h1>

<div class="container">
  <div class="row">
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
