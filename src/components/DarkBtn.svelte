<svelte:options customElement="s-dark-btn" />
<script>
  //import Icon from '@iconify/svelte';
  let iconName = "tabler:sun-moon";
  function toggle() {
    const light = window.document.body.classList.contains('light');
    const dark = window.document.body.classList.contains('dark');
    const ele = window.document.body;
    if(light){
      ele.classList.replace("light", "dark");
    } else {
      ele.classList.replace("dark", "light");
    }
  }
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
  <button onclick={toggle} class="btn-circle btn-action">
    <iconify-icon icon='{iconName}' class="dark-light" ></iconify-icon>
  </button>
<style>
.btn-circle {
  appearance: none;
  background: transparent;
  border: 0.05rem solid #747475;
  cursor: pointer;
  display: flex;
  justify-content:center;
  align-items: center;  
  width: var(--font-size-h4);
  height: var(--font-size-h4);
  border-radius: 50%;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.btn-circle:hover {
  border-color: light-dark(yellow, red);
  text-decoration: none;
}

.dark-light{
  font-size: var(--font-size-h5);
  color: light-dark(red, yellow);
}
</style>