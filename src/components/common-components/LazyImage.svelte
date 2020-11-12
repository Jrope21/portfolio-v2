<script>
  import { onMount } from 'svelte';
  import LazyLoader from "./LazyLoader.svelte";
  import { fade } from "svelte/transition";

  export let imgSrc = "#";
  export let imgSrcSmall = imgSrc;
  export let imgAlt = "Image";
  export let lazy = false;

  let isAbsolute = false;
  let isStatic = false;
  let loaded = false;
  let largeImage;

  function setPosToAbsolute() {
    isAbsolute = true;
    isStatic = false;
  }
  function setPosToStatic() {
    isAbsolute = false;
    isStatic = true;
  }

  onMount(() => {
      if(!lazy) {
          largeImage.onload = () => {
              loaded = true;
          }
      }
  })

</script>

<style>
  .isAbsolute {
    position: absolute;
    top: 0;
    left: 0;
  }
  .isStatic {
    position: static;
  }

  img {
      object-fit: cover;
      width: 100%;
      height: 100%;
  }

.img-hidden {
    opacity: 0;
}

.img-visible {
    opacity: 1;
}

.progressive-image {
    width: 100%;
    height: 100%;
}

.progressive-image img {
    transition: .15s ease opacity;
}
</style>

{#if lazy}
    <LazyLoader let:hasBeenVisible>
        {#if hasBeenVisible}
            <img
                in:fade|local
                class:isAbsolute
                class:isStatic
                src={imgSrc}
                alt={imgAlt} 
            />
        {:else}
            <img
                bind:this={largeImage}
                class="isAbsolute"
                out:fade|local
                on:outrostart={setPosToAbsolute}
                on:outroend={setPosToStatic}
                src={imgSrcSmall}
                alt={imgAlt} 
            />
        {/if}
    </LazyLoader>
{:else}
    <div class="progressive-image">
        <img 
            bind:this={largeImage}
            src={imgSrc} 
            class={loaded ? 'img-visible' : 'img-hidden'} alt={imgAlt}
        >
        <img 
            class={loaded ? 'img-hidden isAbsolute' : 'img-visible isAbsolute'}
            aria-hidden="true" 
            src={imgSrcSmall} 
            alt={imgAlt}
        >
    </div>
{/if}