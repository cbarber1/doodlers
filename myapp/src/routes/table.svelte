<script>
  import { state } from "../store.js";
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

  // Determine if a block has all users' availability in "Preferences"
  const getPreferences = (r, c) => {
    const index = r * columns.length + c;
    return fakeUserData.every(((userData) => userData[index])) && ($state[index]) == true;
  };

  // Determine the proportion of availability in "Group Availability"
  const getAvailabilityProportion = (r, c) => {
    const index = r * columns.length + c;
    // add one for the current user
    let current_user = $state.includes(true) ? 1 : 0;
    let totalUsers = fakeUserData.length + current_user;
    let availableUsers = fakeUserData.reduce(
      (count, userData) => count + ((userData[index] || $state[index]) ? 1 : 0),
      0
    );
    return availableUsers / totalUsers;
  };

  // Function to calculate background color based on availability proportion
  function getBackgroundColor(proportion) {
    if (proportion === 0) {
      return "";
    }

    const lightGreen = [216, 255, 231]; // #D8FFE7
    const darkGreen = [44, 144, 82]; // #2C9052

    const interpolatedColor = lightGreen.map((value, index) => {
      return Math.round(value + (darkGreen[index] - value) * proportion);
    });

    return `rgb(${interpolatedColor.join(",")})`;
  }
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
                style="background-color: {
                $state[rowIndex * columns.length + columnIndex] && isWriteable ? getBackgroundColor(.5) : 
                (title === 'Group Availability'
                  ? getBackgroundColor(
                      getAvailabilityProportion(rowIndex, columnIndex)
                    )
                  : title === 'Preferences' &&
                      getPreferences(rowIndex, columnIndex)
                    ? '#ADB3E3'
                    : '')};"
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
    background-color: #ADE3C2;
  }

  .progress-bar {
    height: 20px;
    width: 100%;
    background-color: #eee;
    margin-top: 10px;
    border-radius: 4px;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #2C9052;
    width: 0%;
    text-align: right;
    line-height: 20px;
    color: white;
    border-radius: 4px;
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
