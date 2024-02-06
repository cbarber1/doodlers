<script>
	import Table_input from './Table_input.svelte';
</script>

<h1 class="header">Doodlers Epic Page</h1>

<div class="container">
<div class="row">
    <div class="col">
    <Table_input isWriteable={true}/>
    </div>
    <div class="col">
    <Table_input isWriteable={false} />
    </div>
</div>

</div>