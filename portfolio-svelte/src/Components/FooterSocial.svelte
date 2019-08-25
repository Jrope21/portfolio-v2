<script>
import TextUnderline from './IconComponents/TextUnderline.svelte';
export let url, content;
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
        /* margin-bottom: 18rem 0rem; */
    }
    a::before {
        content: '|';
        font-size: 14rem;
        display: block;
        color: lightgray;
    }
    /* a::after {
        content: '|';
        font-size: 16rem;
        display: block;
    } */
</style>

<a href="{url}">
    <TextUnderline text={content}/>
</a>
