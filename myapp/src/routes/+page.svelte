<script>
    import Toggle from "./toggle.svelte";
	import Table_input from './Table_input.svelte';
    import clock from '../lib/assets/clock.png';
</script>


<h1 class="text-center p-4">
    <!-- Attribution: <a href="https://www.flaticon.com/free-icons/time-and-date" title="time and date icons">Time and date icons created by Iconic Panda - Flaticon</a> -->
    <img src={clock} alt="Clock Icon" style="width: 32px; height: 32px; margin-right: 5px; margin-bottom: 6px; padding: 0;">
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
