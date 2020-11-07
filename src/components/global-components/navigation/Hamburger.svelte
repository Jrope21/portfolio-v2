<script>
import { onMount, afterUpdate, tick  } from 'svelte';

export let hamburger;

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    #toggle {
      display: none;
    }

    .hamburger {
      position: relative;
      display: block;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
      cursor: pointer;
      overflow: hidden;
      width: 32px;
      height: 18px;
      transition: transform .45s $custom_animation;
    }

    .hamburger::before {
      content: '';
      display: block;
      border-bottom: 2px solid black;
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      transform: translateX(14px);
      transition: transform .45s $custom_animation;
    }

    .hamburger::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      border-bottom: 2px solid black;
      width: 32px;
      transform: translateX(8px);
      transition: transform .45s $custom_animation;
    }

    span.middle {
      display: block;
      border-bottom: 2px solid black;
      width: 32px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

  

    #toggle:hover + label > .hamburger::after {
      transform: translateX(0);
    }

    #toggle:checked + label > .hamburger::after {
      transform: translateX(0);
    }

    #toggle:hover + label > .hamburger::before {
      transform: translateX(0);
    }

    #toggle:checked + label > .hamburger::before {
      transform: translateX(0);
    }

    

    @media screen and (min-width: breakpoint(md)){
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
<label id="nav-label" for="toggle" class="hide-for-xlg">
    <span class="show-for-sr">Navigation</span>
    <span class="hamburger" bind:this={hamburger} title="Navigation">
      <span class="middle"></span>
    </span>
</label>