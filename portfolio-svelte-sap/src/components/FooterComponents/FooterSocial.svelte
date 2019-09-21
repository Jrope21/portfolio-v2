<script>
import TextUnderline from '../IconComponents/TextUnderline.svelte';
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
        font-size: 10rem;
        color: #58595b;
    }
    a::before {
        content: '|';
        font-size: 14rem;
        display: block;
        color: lightgray;
    }
</style>

<a href="{url}">
    <TextUnderline text={content}/>
</a>
