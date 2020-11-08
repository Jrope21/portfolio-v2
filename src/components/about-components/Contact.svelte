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

    h3{
        width: fit-content;
        margin-bottom: 15rem;
        width: 100%;
        text-transform: uppercase;

        @media (min-width: breakpoint(sm)) {
           width: 18%;
        }

        @media (min-width: breakpoint(md)) {
           width: 20%;
        }
    }

    P:nth-child(2)::before{
        content: '';
        display: block;
    }

    .social-container {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    i {
        margin: 05rem 0;
        color: color(accent);
        display: flex;
        align-items: center;
        transition: all .3s ease;
    }

    i > span {
        margin-left: 10rem;
    }

    a:hover i {
        color: color(primary);
    }


</style>

<div>
    <h3>
        Contact
    </h3>
    <div class="social-container">
        <a href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="blank" ><i class="fab fa-github"><span>www.github.com/jrope21</span></i></a>
        <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="blank" ><i class="fab fa-linkedin"><span>www.linkedin.com/in/jr-dev</span></i></a>
        <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" target="blank" ><i class="fas fa-envelope"><span>joshua.micah.roper@gmail.com</span></i></a>
    </div>
</div>