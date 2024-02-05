
<script>
    import { state } from '../store.js'
	let columns = new Array(5)
	let rows = new Array(15)
	// let state = new Array(rows.length*columns.length).fill(false)
	let isDrag = false

    let times = [];
    let time_start = 9;
    for (let i = 0; i < rows.length; i++) {
        if (time_start % 13 === 0) {
            time_start = 1;
        }
        times.push(time_start % 13);
        time_start++;
    }
	
	const beginDrag = () => {
		isDrag = true
	}
	
	const endDrag = () => {
		isDrag = false
	}
	
	const toggle = (r, c) => {
		$state[r*columns.length+c] = !$state[r*columns.length+c]
	}
	
	const mouseHandler = (r, c) => (e) => {
		if (isDrag || e.type === 'mousedown') {
			toggle(r, c)
		}
	}
</script>

<style>
    table {
        border-collapse: collapse;
    }
	td {
		width: 80px;
		height: 15px;
		background-color: white;
        border: 1px dashed black;
        padding: none;
        margin: none;
	}
	.selected {
		background-color: green;
	}

    .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                        user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
    }
</style>

<svelte:window on:mousedown={beginDrag} on:mouseup={endDrag} />
<table>
    <tr>
        <th>Time</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
    </tr>
    
	{#each rows as _row, r}
		<tr>
            <th class="noselect">{times[r]}:00 {r > 2 ? "pm" : "am"}</th>
			{#each columns as _column, c}
				<td on:mousedown={mouseHandler(r, c)} on:mouseenter={mouseHandler(r, c)} class:selected="{$state[r*columns.length+c]}"></td>
			{/each}
		</tr>
	{/each}
</table>