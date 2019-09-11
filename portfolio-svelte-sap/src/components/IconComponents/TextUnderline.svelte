<script>
export let text;
</script>

<style>
span {
    position: relative;
    /* border-bottom: 1px solid lightGray; */
   
    overflow: hidden;
    padding-bottom:1px;
}
span::before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: -100%;
    display: inline-block;
    border-bottom: 1px solid gray;
    width: 100%;
    transform: translate(0);
    z-index: 1;
     transition: transform .3s ease-in-out;
}
span::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    /* left: -100%; */
    display: inline-block;
    border-bottom: 1px solid lightgray;
    width: 100%;
}
a:hover > span::before {
    /* content:''; */
    transform: translate(100%);
    /* left: 0; */
}

a:hover > span::before {
    /* content:''; */
    transform: translate(100%);
    /* left: 0; */
}

</style>

<span class="text-underline">
    {text}
</span>