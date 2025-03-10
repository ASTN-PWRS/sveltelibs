<svelte:options customElement="s-container" />
<div class="container">
  <slot></slot>
</div>
<style lang="scss">
  :host {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    height:calc(100vh - 6.7rem);
    padding: 1rem;
    overflow: auto;
    flex-grow: 1;
  }
</style>