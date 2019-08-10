<script>

</script>

<style>
    .hero-image{
        width: 200px;
        height: 300px;
        background-image: url("images/newYork.jpg");
        background-size: 230%;
        background-position: 45% 65%;
        
        position: relative;
    }
    .hero-image::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 50px;
        background: white;
    }
    .hero-image::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 50px;
        background: white;
    }
</style>
<!-- <img src="..Images/newYork.JPG" alt=""> -->
<div class="hero-image"></div>