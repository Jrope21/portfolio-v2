<script>
import TextUnderline from '../IconComponents/TextUnderline.svelte';
export let url, name;
</script>

<style>
    a {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        font-weight: 300;
        margin: 4rem 0rem;
    }
    a::after {
        content: '|';
        font-size: 14rem;
        display: block;
        color: lightgray;
    }
</style>

<a href="{url}">
    <TextUnderline text={name} />
</a>
