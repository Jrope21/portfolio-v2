<script>

</script>

<style>
 /* animation: 2.8s ease-in 0s 1 fadeInBottom; */
.social-container {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100vh;
    /* width: 100vw; */
    display: flex;
    margin-left: 28px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* left: 30px; */
   /* padding-left: 30px; */
}
i:first-of-type {
    
}
i {
    margin: 05px 0;
    /* margin-right: 5px; */
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
    /* 3.8 */
    animation: 2.8s ease-in-out 0s 1 fadeInBottom;
}
i:nth-child(2){
    position: relative;
    /* 4.6 */
    animation: 3.6s ease-in-out 0s 1 fadeInBottom;
}
i:nth-child(1){
    position: relative;
    margin-top: 50px;
    /* 3.2 */
    animation: 2.2s ease-in-out 0s 1 fadeInBottom;
}
</style>

<div class="social-container">
    <i class="fab fa-github"></i>
    <i class="fab fa-linkedin"></i>
    <i class="fas fa-envelope"></i>
</div>