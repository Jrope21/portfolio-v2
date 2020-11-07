<script>
export let imgSrc, alt;
export let url;
export let width;
</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';
    
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
        box-shadow: 3px 3px 3px color(accentSecondary);
        transform: translateY(0px);
        transition: box-shadow .3s ease, transform .3s ease;
    }

    @media screen and (min-width: breakpoint(sm)){
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
            max-width: 1039px;
            max-height: 450px;
        }
    }

    a:hover .img-container {
        transform: translateY(-4px);
        box-shadow: 5px 5px 5px color(accentSecondary);
    }

    img {
        object-fit: cover;
        transition: all .3s ease-in;
        width: 100%;
        height: 100%;
    }
   
</style>

<a rel=prefetch class="{width}" href="{url}">
    <div class="img-container">
      <img src="{imgSrc}" alt="{alt}">
    </div>
</a>