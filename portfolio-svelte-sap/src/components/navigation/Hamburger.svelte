<script>
import { onMount, afterUpdate, tick  } from 'svelte';

export let toggle;
export let hamburger;

// afterUpdate(async ()=>{
//   function hideMenu(){
//     if(toggle = true){
//       console.log('hamburger')
//       hamburger.click()
//     }
//   }
//   hideMenu();
  
// })






</script>

<style>

@keyframes leaveScreen {
  100%{
    transform: translateX(9999px)
  }
}

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
  /* z-index: -100; */
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: opacity .35s ease-in;
  animation: .01s ease-in .35s 1 leaveScreen forwards;
}

#toggle:hover + .background + label > .hamburger {
  width: 32px;
}

#toggle:checked + .background + label > .hamburger {
  width: 32px;
}

#toggle:hover + .background + label > .hamburger::before {
  width: 32px;
}

#toggle:checked + .background + label > .hamburger::before {
  width: 32px;
}

#toggle:checked + .background {
  opacity: 1;
  z-index: 1;
  animation: unset;
}

@media screen and (min-width: 64em){
  label {
    display: none;
  }
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