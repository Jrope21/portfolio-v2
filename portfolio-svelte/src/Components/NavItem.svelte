<script>
    export let name;
    export let url;
</script>
<style>
    a {
      
        position: relative;
        color: #00E2FF;
        top: 0;
         transform: rotate(0deg);
        transition: all .5s ease-in-out;
        /* transition: top 2s ease-out; */
    }
   li > a {
        /* position: relative; */
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        transform: rotate(-40deg);
        top: 20px;
        /* height: 100px; */
    }

</style>
 <a href="{url}">
        {name}
</a>
