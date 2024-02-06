<script>
	import Table_input from './Table_input.svelte';
    import clock from '../lib/assets/clock.png';
    import clock2 from '../lib/assets/in-time.png'
</script>


<h1 class="text-center p-4">
    <a href="javascript:location.reload(true);"><img src={clock} alt="Clock Icon" style="width: 32px; height: 32px; margin-right: 5px; margin-bottom: 6px; padding: 0;"></a>
    Prefer2Meet</h1>

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
