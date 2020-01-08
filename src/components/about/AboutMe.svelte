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

    p:nth-child(1){
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%
    }

    @media screen and (min-width: 40em){
        p:nth-child(1) {
            width: 20%;
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

    p:nth-child(2){
        width: 100%;
    }

    @media screen and (min-width: 40em){
        p:nth-child(2) {
            width: 65%;
        }
    }

    @media screen and (min-width: 64em){
        p:nth-child(2) {
            width: 50%;
        }
    }

    p {
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }

    @media screen and (min-width: 64em){
        p{
            font-size: 18rem;
            line-height: 23px;
        }
    }

</style>

<div>
    <h3>
        Details
    </h3>
    <p>
        Hi There! I’m Josh, a Dallas-based <strong>Front End Developer</strong> with a knack for programing and design.
         My <strong>passion</strong> comes from being a part of a solution that brings each aspect of the customer journey 
         together across both <strong>development and design</strong> processes.
        I focus on creating <strong>production ready applications</strong> with my knowledge of the user experience, 
        and writing scalable <strong>clean code</strong>.
    </p>
</div>