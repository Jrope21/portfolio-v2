<script>
import TextUnderline from './TextUnderline.svelte';
import CircleIcon from './CircleIcon.svelte';

export let text, url;
</script>

<style>
    a{
        display: flex;
        align-items: center;
        font-size: 12rem;
        color: #989898;
        width: fit-content;
        margin-top: 30rem;
        text-transform: uppercase;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
    }
</style>

<a href="{url}"><CircleIcon /> <TextUnderline text={text}/></a>