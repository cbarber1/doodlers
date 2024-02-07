<script>
  import { writable, derived } from 'svelte/store';
  import { fakeUserData } from "../lib/fakeUserData.js";

  export let title;

  let columns = new Array(8);
  let rows = new Array(28);
  let isDrag = false;
  let isWriteable = title === "My Availability";
  let progressBarWidth = 0;
  const minHours = 4;
  let selectedBlocksCount = 0;
  let selectedHours = 0;

  // Simulating state as a writable store for demonstration
  let state = writable(new Array(columns.length * rows.length).fill(false));

//   let combinedData = derived([state, fakeUserData], ([$state, $fakeUserData]) => {
   
//     let updatedFakeData = [...$fakeUserData]; 

//     updatedFakeData.push($state);

//     return updatedFakeData;
//   });


  let times = [];
  let time_start = 10;
  let period = "AM";

  for (let i = 0; i < rows.length; i++) {
    times.push(`${time_start}${period}`);
    times.push("");

    if (time_start === 11 && period === "AM") {
      period = "PM";
    } else if (time_start === 11 && period === "PM") {
      period = "AM";
    } else if (time_start === 12) {
      time_start = 0;
    }

    time_start++;
  }

  // Interaction handlers
  const beginDrag = () => (isDrag = true);
  const endDrag = () => (isDrag = false);

  const toggleBlock = (index) => {
    state.update((currentState) => {
      currentState[index] = !currentState[index];
      return currentState;
    });
    updateSelectedBlocksCount();
  };

  const handleMouse = (r, c) => (event) => {
    if (isWriteable && (isDrag || event.type === "mousedown")) {
      const index = r * columns.length + c;
      toggleBlock(index);
    }
  };

  // Update the count of selected blocks and calculate selected hours
  const updateSelectedBlocksCount = () => {
    state.subscribe(($state) => {
      selectedBlocksCount = $state.filter((block) => block).length;
      selectedHours = selectedBlocksCount * 0.5; // Assuming each block represents 30 minutes
      progressBarWidth = (selectedHours / minHours) * 100;
    });
  };

  // Determine if a block is selected in "Group Availability" or "Preferences"
  const isSelectedInGroupOrPreferences = (r, c) => {
    const index = r * columns.length + c;
    
    if (title === "Group Availability") {
        // Sum up the availability for this block across all users
        let availableUsers = fakeUserData.reduce(
        (count, userData) => count + (userData[index] ? 1 : 0),
        0
        );
        // If at least one user is available, the block is considered selected
        return availableUsers > 0;
    } else if (title === "Preferences") {
        // Check if all users are available at this block
        return fakeUserData.every((userData) => userData[index]);
    }
    
    // Default to false if neither condition is met
    return false;
    };

</script>

{#if isWriteable}
  <div>
    <p>Try to select at least 4 hours! Selected: {selectedHours} hours</p>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: {progressBarWidth}%"></div>
    </div>
  </div>
{/if}

<div class="table-container">
  <table class="caption-top">
    <caption>{title}</caption>
    <thead>
      <tr>
        <th></th>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as _, rowIndex}
        <tr>
          {#each columns as _, columnIndex}
            {#if columnIndex === 0}
              <th class="noselect times">{times[rowIndex]}</th>
            {:else}
              <td
                class:available={isWriteable &&
                  $state[rowIndex * columns.length + columnIndex]}
                class:group-available={title === "Group Availability" &&
                  isSelectedInGroupOrPreferences(rowIndex, columnIndex)}
                class:preferences={title === "Preferences" &&
                  isSelectedInGroupOrPreferences(rowIndex, columnIndex)}
                on:mousedown={handleMouse(rowIndex, columnIndex)}
                on:mouseenter={handleMouse(rowIndex, columnIndex)}
                on:mouseup={endDrag}
              >
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<svelte:window on:mousedown={beginDrag} on:mouseup={endDrag} />

<style>
  caption {
    display: table-caption;
    text-align: center;
  }

  .table-container {
    overflow-x: auto;
    margin: 20px 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th {
    padding-bottom: 10px;
  }

  th,
  td {
    text-align: center;
    padding: 2px;
    width: 12.5%;
  }

  td {
    border: 1px solid #ddd;
  }

  tr {
    height: 20px;
  }

  .available {
    background-color: #90ee90; /* Light green */
  }

  .group-available {
    background-color: #90ee90; /* Green-yellow, for group availability */
  }

   .preferences {
    background-color: #228b22; /* Forest green, for overlapping blocks */
  } 

  .progress-bar {
    height: 20px;
    width: 100%;
    background-color: #eee;
    margin-top: 10px;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #4caf50;
    width: 0%; 
    text-align: right;
    line-height: 20px;
    color: white;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }

  .times {
    font-size: 10px;
  }
</style>
