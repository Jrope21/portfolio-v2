<script>
export let url, name;
</script>

<style>
    a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        font-weight: 300;
        margin: 4rem 0rem;
        /* text-decoration: underline; */
    }
    a::before {
        content: '';
        border-bottom: 1px solid gray;
        position: absolute;
        width: 10%;
        bottom: -2px;
        display: block;
    }
    /* a::after {
        content: '|';
        font-size: 16rem;
        display: block;
    } */
</style>

<a href="{url}">
    {name}
</a>
