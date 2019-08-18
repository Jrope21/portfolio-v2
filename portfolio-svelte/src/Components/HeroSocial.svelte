<script>

</script>

<style>
 /* animation: 2.8s ease-in 0s 1 fadeInBottom; */
.social-container {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 55%;
}
i {
    margin-right: 5px;
    color: gray;
    /* top: 0; */
    /* transition: top .05s ease-in-out; */
}
i:hover {
    padding-bottom: 3px;  /*increase hover radius on transition*/
    top: -3px;
    transition: top .05s ease-in-out;
}
/*reversing animation order (visual effect)*/
/*must set position: <value> for animation to work*/
i:nth-child(3){
    position: relative;
    animation: 3.8s ease-in 0s 1 fadeInBottom;
}
i:nth-child(2){
    position: relative;
    animation: 4.6s ease-in 0s 1 fadeInBottom;
}
i:nth-child(1){
    position: relative;
    animation: 3.2s ease-in 0s 1 fadeInBottom;
}
</style>

<div class="social-container">
    <i class="fab fa-github"></i>
    <i class="fab fa-linkedin"></i>
    <i class="fas fa-envelope"></i>
</div>