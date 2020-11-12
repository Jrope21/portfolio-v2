<script>
  import LazyLoader from "./LazyLoader.svelte";
  import { fade } from "svelte/transition";

  export let imgSrc = "#";
  export let imgSrcSmall = imgSrc;
  export let imgAlt = "Image";

  let isAbsolute = false;
  let isStatic = false;

  function setPosToAbsolute() {
    isAbsolute = true;
    isStatic = false;
  }
  function setPosToStatic() {
    isAbsolute = false;
    isStatic = true;
  }
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
</style>

<LazyLoader let:hasBeenVisible>
  {#if hasBeenVisible}
    <img
      in:fade
      class:isAbsolute
      class:isStatic
      src={imgSrc}
      alt={imgAlt} />
  {:else}
    <img
      out:fade
      on:outrostart={setPosToAbsolute}
      on:outroend={setPosToStatic}
      src={imgSrcSmall}
      alt={imgAlt} />
  {/if}
</LazyLoader>