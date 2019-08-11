<script>

</script>

<style>

@keyframes fadeInLeft {
    0% {
        left:  -50px;
        opacity: 0;
    }
    100% {
        left: 0px;
        opacity: 1;
    }
}

@keyframes fadeInRight {
    0% {
        left:  50px;
        opacity: 0;
    }
    100% {
        left: 0px;
        opacity: 1;
    }
}

@keyframes extendWidth {
    0% {
        width: 0;
        opacity: 1;
    }
    45% {
        width: 0;
    }
    95% {
        width: 15%;
    }
}
p {
    font-size: 18rem;
    width: 100%;
    color: #00E2FF;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
}

span {
    transition: opacity 1s ease-in-out;
    -webkit-transition: opacity 1s ease;
}

p span:nth-child(1) {
    position: relative;
  
   /*transform: rotate(-90deg) !important;
   top: 40px; */
     /* left: 10px; */
     margin-left: 10px;
     display: block;
     animation: 1.5s ease-in-out fadeInLeft;
}

p span:nth-child(1)::after {
    content: '';
    display: block;
    width: 15%;
    /* height: 10px; */
    margin: 3px 0px 4px 45px;
    border-bottom: 1px solid #00E2FF;
    /* animation: 8s linear fadeIn; */
    animation: 2.5s ease-in-out extendWidth;
    /* -webkit-transition: opacity 1s ease-in-out; */
}

p span:nth-child(2) {
    display: block;
    position: relative;
    margin: auto;
    width: 50%;
    animation: 1.5s ease-in-out fadeInRight;
}

@media screen and (min-width: 560px){
    p span:nth-child(1) {
        position: relative;
        display: inline-block;
        transform: rotate(-90deg) !important;
        top: 40px;
    }
    p span:nth-child(2) {
        position: relative;
        margin-left: -10px;
        display: inline-block;
    }
}
</style>
<p>
<span>Developer</span>
<span>Designer</span>
</p>