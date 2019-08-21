<script>
export let imgSrc;
export let projectName;
</script>

<style>
    a, div{
        max-width: 100%;
    }
    a{
        margin: 15rem;
    }
    .img-container{
        /* position: relative; */
        /* overflow: hidden; */
        /* min-width: 100%; */
        width: 65vw;
        height: 65vw;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    p {
        font-size: 12rem;
        font-weight: 300;
        text-transform: uppercase;
    }
    
</style>

<a>
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <p>{projectName}</p>
</a>