<script>
export let imgSrc;
export let projectName;
</script>

<style>
/*testing  git tracking*/
    a, div{
        max-width: 100%;
    }
    .img-container{
        overflow: hidden;
        width: 65vw;
        height: 65vw;
    }
    @media screen and (min-width: 40em){
        .img-container{
            max-width:100%; 
            width: 20.5vw;
            height: 20.5vw;
        }   
    }
    @media screen and (min-width: 94em){
        .img-container {
            width: 19.5vw;
            height: 19.5vw;
        }
    }
    img {
        object-fit: cover;
        transition: all .3s ease-in-out;
        width: 100%;
        height: 100%;
    }
    a:hover img {
        width: 102%;
        height: 102%;
    }
    p {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0;
   
        text-transform: uppercase;
        transition: all .2s ease-in-out;

        /* font-size: 12px;
        font-weight: 600; */
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }
    @media screen and (min-width: 40em){
        p {
            margin-bottom: 0rem;
            /* font-size: 12rem; */
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
    }
</style>






<a>
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <p><span class="animateSick"></span>{projectName}</p>
</a>