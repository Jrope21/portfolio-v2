<script>
export let imgSrc;
export let projectName;
export let url;

</script>

<style>
    a, div{
        max-width: 100%;
    }

    a {
        opacity: 1;
    }

    .img-container{
        overflow: hidden;
        width: 65vw;
        height: 65vw;
        max-height: 250px;
        box-shadow: 5px 5px 5px lightgrey;
    }

    @media screen and (min-width: 40em){
        .img-container{
            max-width:100%; 
            width: 25vw;
            height: 25vw;
            max-width: 350px;
            max-height: 350px;
        }   
    }

    img {
        object-fit: cover;
        transition: all .3s ease-in-out;
        width: 100%;
        height: 100%;
    }
    





    a:hover img {
        width: 105%;
        height: 105%;
    }
   
</style>

<a href="{url}">
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
</a>