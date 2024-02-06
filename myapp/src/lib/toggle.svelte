<script lang="ts">
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import { Label } from "@smui/common";

  let choices = ["Availability", "Preferences"];
  let selected = "Availability";
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
    margin-right: 120px;
  }
</style>
