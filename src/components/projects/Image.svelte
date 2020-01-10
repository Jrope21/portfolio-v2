<script>
export let imgSrc, alt;
export let url;
export let width;
</script>

<style>
    a, div{
        max-width: 100%;
    }

    a {
        opacity: 1;
    }

    .img-container{
        position: relative;
        overflow: hidden;
        width: 65vw;
        height: 65vw;
        max-height: 250px;
        box-shadow: 3px 3px 3px lightgrey;
        transition: all .3s ease-in;
    }

    @media screen and (min-width: 40em){
        .img-container{
            max-width:100%; 
            width: 25vw;
            height: 25vw;
            max-width: 350px;
            max-height: 350px;
        } 

        .large .img-container {
            width: 30vw;
            height: 30vw;
            max-width: 450px;
            max-height: 450px;
        }

        .full-width {
            width: 100%;
        }

        .full-width .img-container { 
            width: calc(50% - 30vw + 60vw);
            height: 30vw;
            margin: 0 auto;
            /* margin-left: auto; */
            max-width: 1039px;
            max-height: 450px;
        }
    }

    a:hover .img-container {
        position: relative;
        transform: translateY(-3px);
        box-shadow: 5px 5px 5px lightgrey;
    }

    img {
        object-fit: cover;
        transition: all .3s ease-in;
        width: 100%;
        height: 100%;
    }
   
</style>

<a class="{width}" href="{url}">
    <div class="img-container">
      <img src="{imgSrc}" alt="{alt}">
    </div>
</a>