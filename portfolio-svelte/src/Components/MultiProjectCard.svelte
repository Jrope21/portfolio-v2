<script>
export let imgSrc;
export let projectName;
</script>

<style>
    a, div{
        max-width: 100%;
    }
    a{
        /* margin: 15rem; */
    }
    .img-container{
        /* position: relative; */
        overflow: hidden;
        /* min-width: 100%; */
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
    p {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0;
        
        font-size: 12rem;
        font-weight: 300;
        text-transform: uppercase;
        transition: all .2s ease-in-out;
    }
    @media screen and (min-width: 40em){
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
    }
</style>

<a>
    <div class="img-container">
      <img src="{imgSrc}" alt="">
    </div>
    <p><span class="animateSick"></span>{projectName}</p>
</a>