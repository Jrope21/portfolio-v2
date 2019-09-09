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
        /* animation: 1s ease-in-out 0s 1 fadeInLeft forwards; */
    }
    .img-container{
        overflow: hidden;
        width: 65vw;
        height: 65vw;
    }
    @media screen and (min-width: 40em){
        /* a {
            margin-top: 10%;
        } */
        .img-container{
            max-width:100%; 
            width: 25vw;
            height: 25vw;
            max-width: 350px;
            max-height: 350px;
            /* max-width: 80%; */
             /* height: 35vw; */
            /* max-width: 280px;
            max-height: 400px; */
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
    /* p {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0;
        
        font-size: 12rem;
        font-weight: 300;
        text-transform: uppercase;
        transition: all .2s ease-in-out;
    } */
    /* @media screen and (min-width: 40em){
        p {
            margin-bottom: 0rem;
        }
    }
    p::before{
        content: '';
        display: inline-block;
        width: 0px;
        border-bottom: 2px solid gray;
        transition: all .2s ease-in-out;
         
    }
    a:hover p::before {
        content: '';
        margin-right: 20rem;
        width: 30px;
    } */
   
</style>

<a href="{url}">
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <!-- <p><span class="animateSick"></span>{projectName}</p> -->
</a>