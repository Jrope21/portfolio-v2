<script>

</script>

<style>


 /* animation: 2.8s ease-in 0s 1 fadeInBottom; */
.social-container {
         /* position: absolute; */
        /* left: -25px; */
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: flex-start;
}
i {
    margin: 05rem 0;
    color: gray;
    display: flex;
    align-items: center;
}
i > span {
    margin-left: 5rem;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 13rem;
    color: #58595b;
}
i:hover {
    padding-bottom: 3px;  /*increase hover radius on transition*/
    /* top: -3px; */
    transition: top .05s ease-in-out;
}
i:nth-child(3){
    opacity: 0;
    animation: 2.8s ease-in-out 0s 1 fadeInLeft forwards;
}
i:nth-child(2){
    opacity: 0;
    animation: 3.6s ease-in-out 0s 1 fadeInLeft forwards;
}
i:nth-child(1){
    opacity: 0;
    animation: 2.2s ease-in-out 0s 1 fadeInLeft forwards;
}
</style>

<svelte:head>
    <script src="https://kit.fontawesome.com/1309990c29.js"></script>
</svelte:head>

<div class="social-container">
    <i class="fab fa-github"><span>www.github.com/Jrope21</span></i>
    <i class="fab fa-linkedin"><span>Joshua.Micah.Roper@gmail.com</span></i>
    <i class="fas fa-envelope"><span>www.linkedin.com/in/JR-dev</span></i>
</div>