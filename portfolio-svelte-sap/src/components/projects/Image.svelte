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
    }

    a:hover .img-container {
        position: relative;
        transform: translateY(-3px);
        box-shadow: 5px 5px 5px lightgrey;
    }

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        background: rgba(218, 218, 218, 0.173);
        transition: all .3s ease-in;
        z-index: 2;
    }

    /* a:hover .overlay {
        opacity: 1;
    } */

    img {
        object-fit: cover;
        transition: all .3s ease-in;
        width: 100%;
        height: 100%;
    }
    
    /* a:hover img {
        
    } */
   
</style>

<a target="blank" href="{url}">
    <div class="img-container">
        <div class="overlay"><span>View Website</span></div>
      <img src="{imgSrc}" alt="">
    </div>
</a>