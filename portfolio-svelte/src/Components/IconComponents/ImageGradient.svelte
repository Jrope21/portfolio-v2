 <script>
 
 </script>

 <style>
 @keyframes slideInFromTop {
  0% {
   
  }
  50% {
        transform: translateY(100%);
  }
  100% {
        transform: translateY(200%);
  }
}
@keyframes slideInFromBottom {
  0% {
    
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
      transform: translateY(-200%);
  }
}
@keyframes slideOutBottom {
    0% {
        top: 0;
    }
    75%{
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
      75% {
        top: 0;
    }
    100% {
        top: -100%;
    }
}
    .gradient-animate {
        position: absolute;
        top: 00px;
        width: 100%;
        height: 100%;
    }

     .gradient-animate::before {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to top, rgb(53, 53, 53), gray);
        height: 100%;
        width: 50%;
        top: -100%;
        animation: 3.2s ease-in-out 0s 1 slideInFromTop;
    }

    .gradient-animate::after {
        content: '';
        position: relative;
        display: inline-block;
        background-image: linear-gradient(to top, rgb(53, 53, 53), gray);
        height: 100%;
        width: 50%;
        top: 100%;
        animation: 3s ease-in-out 0s 1 slideInFromBottom;
        animation-delay: .4s;
    }

    .boxes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

     .boxes::before {
        content: '';
        position: relative;
        display: inline-block;
        background: white;
        height: 100%;
        width: 50%;
        /* top: 100%; */
        animation: 2s linear 0s 1 slideOutBottom forwards;
    }

    .boxes::after {
        content: '';
        position: relative;
        display: inline-block;
        background: white;
        height: 100%;
        width: 50%;
        /* top: -100%; */
        animation: 2s linear 0s 1 slideOutTop forwards;
       
    }

 </style>
 <span class="boxes"></span>
 <span class="gradient-animate"></span>