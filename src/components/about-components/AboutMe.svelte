<script>

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    div {
        display: flex;
        flex-direction: column;

        @media (min-width: breakpoint(sm)) {
            flex-direction: row;
        }
    }

    p:nth-child(1){
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;

       @media (min-width: breakpoint(sm)) {
            width: 20%;
        }
    }

    h3{
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        text-transform: uppercase;

        @media (min-width: breakpoint(sm)) {
            width: 18%;
        }

        @media (min-width: breakpoint(md)) {
            width: 20%
        }
    }

    p:nth-child(2){
        width: 100%;

        @media (min-width: breakpoint(sm)) {
            width: 65%;
        }

        @media (min-width: breakpoint(md)) {
           width: 50%; 
        }
    }
    
</style>

<div>
    <h3>
        About Me
    </h3>
    <p>
        Hi there! I’m Josh, a Dallas-based <strong>front end developer</strong> with a knack for programming and design.
         My <strong>passion</strong> comes from being a part of a solution that brings each aspect of the customer journey 
         together across both <strong>development and design</strong> processes.
        I focus on creating <strong>production-ready applications</strong> with my knowledge of the user experience, 
        and writing scalable, <strong>clean code</strong>.
    </p>
</div>