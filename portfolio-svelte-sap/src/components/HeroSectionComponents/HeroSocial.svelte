<script>

</script>

<style>


 /* animation: 2.8s ease-in 0s 1 fadeInBottom; */
.social-container {
         position: absolute;
        left: -25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
}
i {
    margin: 05px 0;
    color: gray;
}

@media screen and (min-width: 64em){
    .social-container {
        display: none;
        position: unset;
        flex-direction: row;
    }
}
i:hover {
    padding-bottom: 3px;  /*increase hover radius on transition*/
    top: -3px;
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
    <i class="fab fa-github"></i>
    <i class="fab fa-linkedin"></i>
    <i class="fas fa-envelope"></i>
</div>