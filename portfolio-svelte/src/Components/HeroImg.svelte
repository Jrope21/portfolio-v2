<script>

</script>

<style>
@keyframes slideInFromTop {
  0% {
    top: -100%;
  }
  50% {
    top: 0;
  }
  100% {
      top: 100%
  }
}
@keyframes slideInFromBottom {
  0% {
    top: 100%;
  }
  50% {
    top: 0;
  }
  100% {
      top: -100%
  }
}

@keyframes slideOutBottom {
    0% {
        top: 0;
    }
    100% {
        top: 100%;
    }
}
@keyframes slideOutTop {
    0% {
        top: 0;
    }
      50% {
        top: 0;
    }
    100% {
        top: -100%;
    }
}
    .hero-image{
        width: 200px;
        /* padding: rem; */
        height: 300px;
        background-image: url("images/newYork.jpg");
        background-size: 230%;
        background-position: 45% 65%;
        overflow-y: hidden;
        position: relative;
    }
    .hero-image::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 40px;
        background: white;
        z-index: 1;
    }
    .hero-image::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 40px;
        background: white;
        z-index: 1;
    }
    
    .overlay{
         width: 100%;
         height: 100%;
         background: rgb(24, 24, 24, .2);
    }

    .boxes::before {
        content: '';
        position: relative;
        display: inline-block;
        /* background-image: linear-gradient(to top, rgb(53, 53, 53), #00E2FF); */
        background: white;
        height: 100%;
        width: 100px;
        top: 100%;
        animation: 3s linear 0s 1 slideOutBottom;
    }

    .boxes::after {
        content: '';
        position: relative;
        display: inline-block;
        /* background-image: linear-gradient(to bottom, rgb(53, 53, 53), #00E2FF); */
        background: white;
        height: 100%;
        width: 100px;
        top: -100%;
        
        animation: 3s linear 0s 1 slideOutTop;
       
    }

    .gradient-animate {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

     .gradient-animate::before {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to top, rgb(53, 53, 53), #00E2FF);
        height: 100%;
        width: 100px;
        top: 100%;
        animation: 3.2s ease-in-out 0s 1 slideInFromTop;
    }

    .gradient-animate::after {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to bottom, rgb(53, 53, 53), #00E2FF);
        height: 100%;
        width: 100px;
        top: -100%;
        animation: 3s ease-in-out 0s 1 slideInFromBottom;
        animation-delay: .4s;
    }

</style>
<!-- <img src="..Images/newYork.JPG" alt=""> -->
<div class="hero-image">
    <div class="overlay boxes">
       
    </div>
     <span class="gradient-animate"></span>
</div>
