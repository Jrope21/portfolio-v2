<style>
/* need to setup loading spinner - arrow appears after */
/*
@keyframes spinOut {
    0% {
        transform: rotate(0deg);
         border-radius: 0%;
    }
    98%{
   
    100% {

        border-radius: 90%;
        transform: rotate(360deg);
        z-index: -2;
    }
}
@keyframes spinOutReverse {
    0% {
        transform: rotate(0deg);
    }
    50% {

    }
    100% {
        transform: rotate(-359deg);
    }
}*/
    a {
        position: absolute;
        bottom: 110px;
        left: 100px;
         /* animation: 2s ease-in 0s 1 spinOut; */
          /* transform: rotate(45deg); */
        /* animation: 2.5s ease-in 0s 1 spinOut; */
    }
  
    a:before {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        left: 5px;
        /* transform: rotate(45deg); */
        /* animation: 1s ease-in 0s 1 spinOutReverse; */
    }
    a:after {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 15px;
        top: 07px;
        right: 5px;
        /* transform: rotate(-45deg); */
     
        
    }

    /*span sets up dashes*/
   span {
        position: relative;
        display: block;
        border-right: 1px solid gray;
        height: 20px;
        top: -10px;
        /* transform: rotate(0deg); */
    }
      /* setup spinner */
   /* span::before {
        content: '';
        display: block;
        position: absolute;
        right: -20px;
        padding: 20px;
        background: gray;
        z-index:-2;
        border-radius: 100%;
        animation: 2.5s ease-in 0s 1 spinOutReverse;
    }
    span::after{
        content: '';
        display: block;
        position: absolute;
        right: -19px;
        top: 1px;
        padding: 19px;
        border-radius: 100%;
        background: white;
        z-index: 2;
         animation: 7s ease-in 0s 1 spinOut;

    }*/
    /* span::before {
        content: '';
        display: block;
        position: absolute;
        border-right: 1px solid gray;
        height: 20px;
        left: 04.5px;
        bottom: 04px;
    } */
    /* span::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 04px;
        border-right: 1px solid gray;
        height: 20px;
        right: 04.5px;
    } */

</style>

<script>

</script>

<a href="#"><span></span></a>