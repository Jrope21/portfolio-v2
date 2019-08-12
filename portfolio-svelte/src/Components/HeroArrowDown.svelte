<style>
    a {
        position: absolute;
        bottom: 110px;
        left: 100px;
    }
    span {
        position: relative;
        display: block;
        border-right: 1px solid gray;
        height: 20px;
        top: -10px;
    }
    span::before {
        content: '';
        display: block;
        position: absolute;
        transform: rotate(45deg);
        border-right: 1px solid gray;
        height: 10px;
        left: 03.5px;
        bottom: -.5px;
    }
    span::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -.5px;
        transform: rotate(-45deg);
        border-right: 1px solid gray;
        height: 10px;
        right: 03.5px;
    }

</style>

<script>

</script>

<a href="#"><span></span></a>