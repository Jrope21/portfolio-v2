<script>
    
</script>

<style>
    a {
        position: fixed;
        left: 25px;
        top: 20px;
    }
    /*line coming from top*/
    a::before {
        content: '';
        display:inline-block;
        position: fixed;
        top: 0;
        padding: 14px;
        border-radius: 100%;
        left: 40px;
        height:20px;
        transform: rotate(-2deg);
        border-right: 3px solid gray;
        z-index: 3;
    }
    .shape {
        display: inline-block;
        padding:20px;
        border-radius: 100%;
        background: gray;
    }
    /*white cover shape*/
    .shape::before {
        content: '';
        position:absolute;
        display: inline-block;
        padding:17px;
        border-radius: 50%;
        background: white;
        top: 0;
        left: 20%;
        z-index: 1;
    }
    /* .shape::after {
        content: '';
        position:absolute;
        display: inline-block;
        padding:20px;
        border-radius: 100%;
        background: gray;
        top: -10px;
        left: 20px;
    } */
    .letters{
        position: absolute;
        z-index: 2;
        left: 17px;
        top: 7px;
        font-size: 12px;
    }
    .letters > span:nth-child(1){

    }
    .letters > span:nth-child(2){
        position: relative;
        left: -6px;
        top: 4px;
    }
</style>

<a>
    <span class="shape"></span>
    <span class="letters">
        <span>J</span>
        <span>R</span>
    </span> 
</a>