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
            width: 15%;
        }
    }
    /* p:nth-child(2){
        width: 50%;
    } */
    P:nth-child(2)::before{
        content: '';
        display: block;
    }
    p {
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }



.social-container {
         /* position: absolute; */
        /* left: -25px; */
        width: 50%;
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
    margin-left: 10rem;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 13rem;
    color: #58595b;
}
/* i:nth-child(3){
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
} */
</style>

<svelte:head>
    <script src="https://kit.fontawesome.com/1309990c29.js"></script>
</svelte:head>

<div>
    <h3>
        Contact
    </h3>
    <div class="social-container">
        <i class="fab fa-github"><span>www.github.com/Jrope21</span></i>
        <i class="fab fa-linkedin"><span>Joshua.Micah.Roper@gmail.com</span></i>
        <i class="fas fa-envelope"><span>www.linkedin.com/in/JR-dev</span></i>
    </div>
</div>