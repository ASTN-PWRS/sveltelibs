<svelte:options customElement="s-appbar" />
<script>
  let {theme = "primary"} = $props();
</script>

<header class="appbar" style="background-color: var(--{theme})">
  <section class="appbar-section">
    <slot name="appbar-left"></slot>
  </section>
  <section class="appbar-center">
    <slot name="appbar-center"></slot>
  </section>
  <section class="appbar-section">
    <slot name="appbar-right"></slot>
  </section>
</header>

<style lang="scss">
.appbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin:0;
  background-color: var(--primary);
  min-height:var(--font-size-h6);
}
.appbar * {
  font-size: var(--font-size-h6);
}

.appbar-section {
  align-items: center;
  display: flex;
  flex: 1 0 0;
}

.appbar-section:not(:first-child):last-child {
  justify-content: flex-end;
}

.appbar-center {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
}

</style>