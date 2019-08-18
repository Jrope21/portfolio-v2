<script>

</script>

<style>

@keyframes fadeInBottom {
    0% {
        top:  20px;
        opacity: 0;
    }
    65% {
        top: 20px;
        opacity: 0;
    }
    100% {
        top: 0px;
        opacity: 1;
    }
}

@keyframes extendSeperator {
    0% {
        font-size: 0px;
    }
    95% {
        font-size: 0px;
    }
    100% {
        font-size: 10rem;
    }
}

p {
    margin-top: 30px;
    font-size: 10rem;
    width: 85%;
    /* color: #00E2FF; */
    color: gray;
    display: flex;
    justify-content: flex-end;
}

span{
    margin-right: 2px;
}

p span.text:nth-child(1) {
    position: relative;
    opacity: 1;
    animation: 2.8s ease-in 0s 1 fadeInBottom;
}

p span.text:nth-child(3) {
    position: relative;
    opacity: 1;
    animation: 3.8s ease-in 0s 1 fadeInBottom;
}

p span.text:nth-child(5) {
    position: relative;
    opacity: 1;
    animation: 4.8s ease-in 0s 1 fadeInBottom;
}

span.seperator {
    /* font-size: 0px; */
    animation: 5s ease-in 0s 1 extendSeperator;
}

</style>
<!-- turn this into props? -->
<p>
    <span class="text">Innovative</span> <span class="seperator">|</span>
    <span class="text">Bold</span> <span class="seperator">|</span>
    <span class="text">Creative</span>
</p>