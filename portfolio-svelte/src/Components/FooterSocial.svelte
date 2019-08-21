<script>
export let url, content;
</script>

<style>
    a {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
    }
    a::before {
        content: '|';
        font-size: 16rem;
        display: block;
    }
    a::after {
        content: '|';
        font-size: 16rem;
        display: block;
    }
</style>

<a href="{url}">
    {content}
</a>
