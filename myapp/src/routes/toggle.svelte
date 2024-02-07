<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import { Label } from "@smui/common";

  const dispatch = createEventDispatcher();

  let choices = ["Availability", "Preferences"];
  let selected = "Availability";

  // Whenever 'selected' changes, dispatch an event with the new value
  $: if (selected) dispatch('change', selected);
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
    margin-right: 50px;
  }
</style>

