<script>

</script>

<style>

    div {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (min-width: 40em){
        div{
            flex-direction: row;
        }
    }

    h3{
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        text-transform: uppercase;
    }

    @media screen and (min-width: 40em){
        h3 {
            width: 18%;
        }
    }

    @media screen and (min-width: 64em){
        h3 {
            font-size: 23rem;
            width: 20%;
        }
    }

    P:nth-child(2)::before{
        content: '';
        display: block;
    }
    p {
        /* font-family: 'Open Sans', sans-serif; */
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }


    
    .social-container {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    i {
        margin: 05rem 0;
        color: gray;
        display: flex;
        align-items: center;
        transition: all .45s ease-in-out;
    }

    i > span {
        margin-left: 10rem;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }

    @media screen and (min-width: 64em){
        i > span{
            font-size: 18rem;

        }
    }

    a:hover i {
        color: #3B3B3B;
    }


</style>

<svelte:head>
    <script src="https://kit.fontawesome.com/1309990c29.js"></script>
</svelte:head>

<div>
    <h3>
        Contact
    </h3>
    <div class="social-container">
        <a href="https://www.github.com/Jrope21" target="blank" ><i class="fab fa-github"><span>www.github.com/Jrope21</span></i></a>
        <a href="https://www.linkedin.com/in/JR-dev" target="blank" ><i class="fab fa-linkedin"><span>www.linkedin.com/in/JR-dev</span></i></a>
        <a href="mailto:joshua.micah.roper@gmail.com" target="blank" ><i class="fas fa-envelope"><span>Joshua.Micah.Roper@gmail.com</span></i></a>
    </div>
</div>