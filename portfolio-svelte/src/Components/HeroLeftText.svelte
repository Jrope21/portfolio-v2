<script>

</script>

<style>
p {
    font-size: 12rem;
}
p span:nth-child(1) {
    /* position: relative;
  
   transform: rotate(-90deg) !important;
   top: 40px; */
     display: inline-block;
}

p span:nth-child(2) {

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
        left: -10px;
    }
}
</style>
<p>
<span>Developer</span>
<span>Designer</span>
</p>