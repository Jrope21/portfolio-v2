<style>
@keyframes specialFadeInDoe {
    0%{
        bottom: 125px;
    }
    100%{
       bottom: 110px;
       opacity: 1;
    }
}
@keyframes bounce {
    0%{
        /* opacity: 0; */
        bottom: 110px;
    }
    50%{
        /* opacity: 0; */
        bottom: 115px;
    }
    100%{
       bottom: 110px;
       opacity: 1;
    }
}
    a {
        position: absolute;
        bottom: 110px;
        /* left: 100px; */
        left: 25%;
        animation: .8s ease-in-out 5s 1 specialFadeInDoe forwards;
        opacity: 0;
    }
  
    a:before {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        left: 5px;
        transform: rotate(45deg);
        
    }
    a:after {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        right: 5px;
        transform: rotate(-45deg);
    }

    /*span sets up dashes*/
   span {
        position: relative;
        display: block;
        border-right: 1px solid gray;
        height: 20px;
        top: -10px;
        
    }

</style>

<script>

</script>

<a href="#"><span></span></a>