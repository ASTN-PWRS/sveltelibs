<svelte:options customElement="s-drawer-btn" />
<script>
  let {open} = $props();
  const active = $derived(open ? "open" : "");
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="row cf">
  <div class="three">
    <div class="hamburger {active}">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </div>
</div>
<style lang="scss">

.row .three{
  box-sizing: border-box;
  background-color: transparent;
  text-align: center;
}

.hamburger .line{
  width: 1.5rem;
  height: 0.18rem;
  background-color: #ecf0f1;
  display: block;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover{
  cursor: pointer;
}

.hamburger.open .line:nth-child(2){
  opacity: 0;
}

.hamburger.open .line:nth-child(1){
  transform: translateY(0.6rem) rotate(45deg);
}

.hamburger.open .line:nth-child(3){
  transform: translateY(-0.4rem) rotate(-45deg);
}

</style>