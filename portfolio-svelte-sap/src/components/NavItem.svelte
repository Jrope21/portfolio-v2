<script>
    export let name;
    export let url;
    export let rel;
    export let segment;
</script>
<style>
    a {
        position: relative;
        color: gray;
        top: 0;
         transform: rotate(0deg);
        transition: all .5s ease-in-out;
        text-transform: uppercase;
        font-size: 12rem;
    }
   li > a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    
    @media screen and (min-width: 560px){
        li > a {
            height: 100px;
        }
    }

    li > a::after {
        content: '';
        position: absolute;
        display: inline-block;
        border-bottom: 1px solid gray;
        width: 1px;
        margin: 8px;
        opacity: 0;
        transition: all .7s ease-in-out;
    }

    li:hover > a::after {
        opacity: 1;
        width: 20px;
    }

</style>
 <a {rel} rel="" href="{url}" class='{segment === "blog" ? "selected" : ""}'>
        {name}
</a>
