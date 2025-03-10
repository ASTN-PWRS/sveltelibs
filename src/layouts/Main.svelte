<svelte:options customElement="s-main" />
<main>
  <slot></slot>
</main>
<style lang="scss">
  main {
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items:stretch;
    background-color: transparent;
    width: 100vw;
  }
</style>