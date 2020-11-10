<script>
    import { onMount } from 'svelte';
    import { draw, fade, blur, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    export let enableFullAnimation, isBoxVisible;

    let duration = 3000;
    
    let visible = true;
    let toggleFullAnimation = false;

    onMount(() => {
        toggleFullAnimation = enableFullAnimation ? true : false;
        if(toggleFullAnimation) {
          setTimeout(() => {
              document.querySelectorAll('polygon').forEach(polygon => {
                  polygon.style.fill = '#797777';
                  polygon.style.stroke = 'white';
              })
          }, 1500)
        }
    })
    
</script>
<style lang="scss">
    @import '../../../styles/global.variables.scss';
    svg {
        width: 50px;
        padding: 2px;
    }

    path {
        fill: #797777;
    }
    polygon {
        fill: #797777;
    }

    #logo-full-animation {
      width: 100px;
      padding: 5px;
      // path {

      // }
      polygon {
        fill: white;
        transition: 2s;
      }
    }
</style>

{#if enableFullAnimation}
  <svg id="logo-full-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.7 125.7">
    <defs>
      <style>
        .cls-1 {
          fill: #231f20;
        }
      </style>
    </defs>
    {#if toggleFullAnimation}
      <g>
        <path 
            in:fade="{{duration: duration, delay: 2000, easing: quintOut}}"
            id="R" 
            class="cls-1" 
            d="M84.8,30.7h45.4V25.1H71.6V46H84a4.2,4.2,0,1,1,0,8.4H71.6V74.3h6.7l12.3,25.8h26.1L100.9,69.4a22.8,22.8,0,0,0,10.3-18.8H114V39.3H102.8V50.6h2.7a17.3,17.3,0,0,1-9.7,15.2l-2.5,1.3.4.8,13.7,26.5H94.1L81.9,68.6H77.2V60H84a9.8,9.8,0,1,0,0-19.6H77.2V30.7Z"
        />
        <polygon 
            in:draw="{{duration: duration, delay: 0, easing: quintOut}}" 
            style="stroke:rgb(0, 0, 0); stroke-width: 1"
            id="BOTTOM-Line" 
            class="cls-1" 
            points="128.5 43.4 128.5 54.6 128.8 54.6 131.2 54.6 131.2 120.1 15.2 120.1 15.2 95 9.5 95 9.5 125.7 9.9 125.7 15.2 125.7 131.2 125.7 136.9 125.7 136.9 120.1 136.9 54.6 139.3 54.6 139.7 54.6 139.7 43.4 128.5 43.4"
        />
        <path 
            in:fade="{{duration: duration, delay: 2000, easing: quintOut}}"
            id="J" 
            class="cls-1" 
            d="M43.3,25.1v48c0,4.6-2,6.7-6.2,6.7H34.7V77H23.5V88.2H34.7V85.5h2.4c7.3,0,11.9-4.8,11.9-12.4V30.7H60.3V73.5C60.3,88.3,48.6,95,37.1,95H9.5v5.7H37.1a31.3,31.3,0,0,0,19.6-6.6c6-4.9,9.2-12.1,9.2-20.6V25.1Z"
        />
        <polygon 
            in:draw="{{duration: duration, delay: 500, easing: quintOut}}" 
            style="stroke:rgb(0, 0, 0); stroke-width: 1"
            id="TOP-Line" 
            class="cls-1" 
            points="129.7 0 124.5 0 8.4 0 2.8 0 2.8 5.7 2.8 71.1 0.3 71.1 0 71.1 0 82.4 11.2 82.4 11.2 71.1 10.9 71.1 8.4 71.1 8.4 5.7 124.5 5.7 124.5 30.7 130.2 30.7 130.2 0 129.7 0"
        />
      </g>
    {/if}
  </svg>
{/if}

{#if !enableFullAnimation}
  <svg id="JR-Logo-Squere" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.7 125.7">
    <defs>
      <style>
        .cls-1 {
          fill: #231f20;
        }
      </style>
    </defs>
    <g>
      <path 
          id="R" 
          class="cls-1" 
          d="M84.8,30.7h45.4V25.1H71.6V46H84a4.2,4.2,0,1,1,0,8.4H71.6V74.3h6.7l12.3,25.8h26.1L100.9,69.4a22.8,22.8,0,0,0,10.3-18.8H114V39.3H102.8V50.6h2.7a17.3,17.3,0,0,1-9.7,15.2l-2.5,1.3.4.8,13.7,26.5H94.1L81.9,68.6H77.2V60H84a9.8,9.8,0,1,0,0-19.6H77.2V30.7Z"
      />
      {#if !isBoxVisible}
        <polygon 
            in:fade="{{duration: 400, delay: 0}}" 
            out:fade="{{duration: 250, delay: 0}}" 
            id="BOTTOM-Line" 
            class="cls-1" 
            points="128.5 43.4 128.5 54.6 128.8 54.6 131.2 54.6 131.2 120.1 15.2 120.1 15.2 95 9.5 95 9.5 125.7 9.9 125.7 15.2 125.7 131.2 125.7 136.9 125.7 136.9 120.1 136.9 54.6 139.3 54.6 139.7 54.6 139.7 43.4 128.5 43.4"
        />
      {/if}
      <path 
          id="J" 
          class="cls-1" 
          d="M43.3,25.1v48c0,4.6-2,6.7-6.2,6.7H34.7V77H23.5V88.2H34.7V85.5h2.4c7.3,0,11.9-4.8,11.9-12.4V30.7H60.3V73.5C60.3,88.3,48.6,95,37.1,95H9.5v5.7H37.1a31.3,31.3,0,0,0,19.6-6.6c6-4.9,9.2-12.1,9.2-20.6V25.1Z"
      />
      {#if !isBoxVisible}
        <polygon 
            in:fade="{{duration: 400, delay: 0}}" 
            out:fade="{{duration: 250, delay: 0}}" 
            id="TOP-Line" 
            class="cls-1" 
            points="129.7 0 124.5 0 8.4 0 2.8 0 2.8 5.7 2.8 71.1 0.3 71.1 0 71.1 0 82.4 11.2 82.4 11.2 71.1 10.9 71.1 8.4 71.1 8.4 5.7 124.5 5.7 124.5 30.7 130.2 30.7 130.2 0 129.7 0"
        />
      {/if}
    </g>
  </svg>
{/if}