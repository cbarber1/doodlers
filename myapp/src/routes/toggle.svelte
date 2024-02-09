<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import { Label } from "@smui/common";

  const dispatch = createEventDispatcher();

  let choices = ["Availability", "Preferences"];
  let selected = "Availability";

  $: if (selected) dispatch("change", selected);
</script>

<div class="segmented-button-wrapper">
  <SegmentedButton segments={choices} let:segment singleSelect bind:selected>
    <Segment {segment}>
      <Label>{segment}</Label>
    </Segment>
  </SegmentedButton>
</div>

<style>
  .segmented-button-wrapper {
    margin-top: 5px;
  }

  :global(.mdc-segmented-button__segment--selected) {
    background-color: #ade3c2;
    color: #2c9052;
  }

  :global(.mdc-segmented-button__segment:nth-child(2).mdc-segmented-button__segment--selected) {
    background-color: purple;
    color: white;
  }

  :global(.mdc-segmented-button__segment:hover) {
    background-color: #E2F9EB;
  }

  :global(.mdc-ripple-upgraded) {
    --mdc-ripple-color: transparent !important;
    --mdc-ripple-press-opacity: 0 !important;
  }
</style>
