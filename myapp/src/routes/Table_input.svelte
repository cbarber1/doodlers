
<script>
    import { selections } from '../store.js';
    export let isWriteable;
	let columns = new Array(8)
	let rows = new Array(30)
	let isDrag = false
    let selectedBlocksCount = 0;
    let selectedHours = 0;
    let selectedBlocksRight = new Array(columns.length * rows.length).fill(false);
    
    if (!isWriteable) {
        [2 * columns.length + 10, 2 * columns.length + 11, 3 * columns.length + 12, 2 * columns.length + 12, 6 * rows.length + 10, 7 * rows.length + 11, 8 * rows.length + 12, 9 * rows.length + 13].forEach(index => {
            selectedBlocksRight[index] = true;
        });
    }

    let times = [];
    let time_start = 9;
    for (let i = 0; i < rows.length; i++) {
        if (time_start % 13 === 0) {
            time_start = 1;
        }
        times.push((time_start % 13).toString() + ":00");
        times.push([])
        time_start++;
    }

    const minHours = 4;
    let progressBarWidth = 0;

    // initialize the pre-selections on right
    // selectedBlocksRight.forEach(index => {
    //     $selections[index] = true;
    // });

	const beginDrag = () => {
		isDrag = true
	}
	
	const endDrag = () => {
		isDrag = false
	}
	
	const toggle = (r, c) => {
        if (isWriteable) {
            $selections[r*columns.length+c] = !$selections[r*columns.length+c]
            updateSelectedBlocksCount();
        }
	}
	
	const mouseHandler = (r, c) => (e) => {
		if (isWriteable && (isDrag || e.type === 'mousedown')) {
			toggle(r, c)
		}
	}
    
    const updateSelectedBlocksCount = () => {
        selectedBlocksCount = $selections.filter((block) => block).length;
    };

    const isOverlappingBlock = (r, c) => {
        const index = r * columns.length + c;
        return selectedBlocksRight[index] && $selections[index];
    };

    $: progressBarWidth = (selectedHours / minHours) * 100;
    $: selectedHours = selectedBlocksCount * .5
</script>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
	td {
		width: 80px;
		height: 15px;
		background-color: white;
        border: 1px dashed black;
        padding: none;
        margin: none;
	}

    tr {
       /* how to make rows same height? */
    }

    th {
        text-align: center;
    }

	.selected {
		background-color: green;
	}

    td.overlapping {
        background-color: darkgreen;
    }

    .small-text {
        font-size: 10px;
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
    .progress-bar {
        width: 100%;
        height: 20px;
        background-color: #eee;
        margin-top: 10px;
    }

    .progress-bar-fill {
        height: 100%;
        background-color: green;
        width: 0%;
        transition: width 0.3s;
    }
    .top-padding {
        height: 60px;
    }
</style>

{#if isWriteable}
<div>
    <p>Try to select at least 4 hours! Selected: {selectedHours}</p>
</div>

<div class="progress-bar">
    <div class="progress-bar-fill" style="width: {progressBarWidth}%"></div>
</div>
{:else}
<div class="top-padding">
    <div></div>
</div>
{/if}

<svelte:window on:mousedown={beginDrag} on:mouseup={endDrag} />

<table>
    <tr>
        <th>Time</th>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tues</th>
        <th>Wed</th>
        <th>Thurs</th>
        <th>Fri</th>
        <th>Sat</th>
    </tr>
    
	{#each rows as _row, r}
		<tr>
			{#each columns as _column, c}
                {#if c != 0}
                    <td on:mousedown={mouseHandler(r, c)}
                    on:mouseenter={mouseHandler(r, c)}
                    class:selected="{$selections[r*columns.length+c] | selectedBlocksRight[r * columns.length + c]}"
                    class:overlapping="{isOverlappingBlock(r, c)}"
                    ></td>
                {:else}
                    <div class="noselect"><p class="small-text">{times[r]}</p></div>
                {/if}
            {/each}
		</tr>
	{/each}
</table>
