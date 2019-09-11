<script>
    export let text;
</script>

<style>
    /* h3 {
        font-weight: 500;
        font-size: 12rem;
        margin-bottom: 10rem;
        text-transform: uppercase;
    } */
    h2 {
        /* text-transform: uppercase; */
    }
   p{
        line-height: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13px;
        color: #58595b;
        text-indent: 10px;
    }
    @media screen and (min-width: 40em) {
        p {
            width: 75%;
            max-width: 420px;
        }
    }
</style>
<h3>wassup little girl</h3>
<p>
    {text}
</p>