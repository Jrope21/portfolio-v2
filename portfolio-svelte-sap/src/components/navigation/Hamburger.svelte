<script>
import { onMount } from 'svelte';

export let toggle = false;
let hamburger;

onMount(()=>{

  
})

function hideMenu(){
  if(toggle = true){
    console.log(hamburger)
    hamburger ? hamburger.click() : null;
    toggle = false;
  }
}

$: hideMenu();



</script>

<style>

#toggle {
  display: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  border-bottom: 2px solid black;
  width: 24px;
  height: 22px;
  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

.hamburger::before {
  content: '';
  display: block;
  border-bottom: 2px solid black;
  width: 18px;
  transition: width .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

.hamburger::after {
  content: '';
  display: block;
  border-bottom: 2px solid black;
  width: 32px;
}

.background {
  background: rgba(0, 0, 0, 0.319);
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -100;
  bottom: 0;
  left: 0;
  transition: opacity .35s ease-in;
}

#toggle:checked + .background + label > .hamburger {
  width: 32px;
}

#toggle:checked + .background + label > .hamburger::before {
  width: 32px;
}

#toggle:checked + .background {
  opacity: 1;
  z-index: 1;
}

.show-for-sr {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}

</style>

<input id="toggle" type="checkbox" class="hide subnav-toggle hide-for-xlg">
<div class="background"></div>
<label id="nav-label" bind:this={hamburger} for="toggle" class="hide-for-xlg">
    <span class="show-for-sr">Navigation</span>
    <span class="hamburger" title="Navigation"> </span>
</label>