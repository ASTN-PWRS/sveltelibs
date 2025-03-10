<svelte:options customElement="s-side-menu" />
<script>
  let {open} = $props();
  let active = $state("");
  $effect(() => {
    if(open) {
      active = "";
    } else {
      active = "close";
    }
  });
</script>
<div class="side {active}">
  <slot></slot>
</div>
<style>
  :host {
    display: flex;
    align-self: stretch;
    transition: 1.5s;
  }
  .side {
    border: 1px solid white;
  }
  .close {
    display: none;
    border:none;
    transition: 1.5s;
  }
</style>