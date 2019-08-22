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
    @media screen and (min-width: 40em){
        .img-container{
            width: 19.5vw;
            height: 19.5vw;
        }   
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    p {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 15rem;
        font-size: 12rem;
        font-weight: 300;
        text-transform: uppercase;
        transition: all .2s ease-in-out;
    }
    p::before{
        content: '';
        display: inline-block;
        width: 0px;
        border-bottom: 2px solid gray;
         transition: all .2s ease-in-out;
         
    }
    /* p::before {
        content: '';
        display: inline-block;
        transform: rotate(45deg);
        border-radius: 2px;
     
        left: 0;
        border: 1px solid gray;
        height: 15px;
        width: 15px;
        transition: all .6s ease-in-out;
    }
    p::after {
        content: '';
        display: inline-block;
        transform: rotate(90deg);
        border-radius: 2px;
        position: absolute;
        left: 8px;
        border-right: 1px solid gray;
        height: 12px;
        transition: all .6s ease-in-out;
    }
    a:hover p::before {
        transform: rotate(-45deg);
    }
    a:hover p::after {
        transform: rotate(180deg);
    } */
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