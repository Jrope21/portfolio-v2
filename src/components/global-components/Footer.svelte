<script>
    import ContactModal from '../common-components/modals/ContactModal.svelte';
    import TextAnimation from '../common-components/TextAnimation.svelte';

    let showModal;

    function openModal(){
        showModal = true;
    }

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';
    footer {
        border-top: 1px solid #d6d6d6;
        background: white;
        color: color(primary);
    }

    .footer-container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        padding-bottom: 0;

        @media (min-width: breakpoint(sm)) {
            flex-direction: row;
        }
    }

    .left, .right {
        margin-bottom: 55rem;

        @media (min-width: breakpoint(sm)) {
            margin-bottom: 60rem;
        }

        @media (min-width: breakpoint(md)) {
            margin-bottom: 70rem;
        }
    }

    @media (min-width: breakpoint(sm)){
        .bottom-row {
            display: flex;
        }
        .left, .copyright{
            padding-right: 80rem;
            width: 60%;
        }
        .right {
            padding-top: 20rem;
        }
    }

    @media (min-width: breakpoint(md)){
        .left, .copyright {
            width: 50%;
        }
    }

    .text-cta:first-of-type {
        margin-bottom: 20rem;
    }

    .headline {
        font-size: 40px;
        line-height: 45px;
        font-weight: 700;
        max-width: 420px;
    }

    .headline a {
        // color: color(accent);
        color: #696969;
        position: relative;
        z-index: 1;
        overflow: hidden;
        display: inline-block;
        // line-height: ;
        margin-left: -5rem;
        margin-right: -5rem;
        margin-bottom: -5rem;
        padding: 0 5rem;
        transition: .3s color ease;
        // transition: all .3s ease-in-out;
        // opacity: .75;
    }

    .headline a::after {
        content: '';
        position: absolute;
        left: 0;
        // transform: translate(100%, -50%);
        top: 50%;
        transform: translate(0, -50%);
        width: calc(100% + 14px);
        margin-left: -10%;
        margin-top: 4px;
        opacity: 1;
        height: 14px;
        background: #c0bdbd;
        z-index: -1;
        opacity: .5;
        // border-bottom: 2px solid #3B3B3B;
        transition: transform .45s $custom_animation;
    }

    .headline a:hover::after {
        
        transform: translate(100%, -50%);
    }

    .headline a:hover {
        color: color(primary);
    }

    // .headline a:hover {
    //     color: black;
    // }

    .title {
        font-weight: 100;
        font-size: 12rem;
    }

    .text-cta a {
        font-size: 14rem;
    }

    .bottom-row {
        padding-top: 0;
    }

    .copyright {
        font-size: 12rem;
        font-style: italic;
        font-weight: 300;
    }

    .left .open-modal {
        display: block;
        color: color(secondary);
        font-size: 18px;
        font-weight: 800;
        margin-top: 25rem;
        transition: opacity .3s ease-in-out;
    }

    .left .open-modal:hover {
        opacity: .75;
    }

    div.social-icons {
        margin-top: 12px;
        min-width: 206px;
    }

    i {
        font-size: 18px;
        margin-right:10px;
        color: #808080;
        transition: all .3s ease;
    }

    a:hover > i {
        transform: translateY(-3px);
        color: color(secondary);
    }

    @media screen and (min-width: breakpoint(sm)) {
        div.social-icons {
            margin: 0;
        }
        i{
            font-size: 18px;
            margin-right: 10px;
        }
        .left .open-modal {
            margin-top: 60rem;
        }

    }

    @media screen and (min-width: breakpoint(md)){
        .title{
            font-size: 16rem
        }
        .text-cta a {
            font-size: 18rem;
        }
        .copyright {
            font-size: 14rem;
        }
        .headline {
            font-size: 45px;
            max-width: 440px;
        }
        .left .open-modal{
            font-size: 22px;
            margin-top: 70rem;
        }
        i {
            font-size: 20px;
        }
    }

</style>

<footer>
    <div class="container footer-container">
        <div class="left">
            <p class="headline">
                Feel free to shoot me an <a href="mailto:joshua.micah.roper@gmail.com">email</a> & connect through <a href="https://www.linkedin.com/in/jr-dev" target="blank">social.</a>
            </p>
            <a class="open-modal" on:click={openModal} href="javascript:void(0)">Reach out!</a>
        </div>
        <div class="right">
            <div class="text-cta">
                <p class="title">
                    Get In Touch!
                </p>
                <a href="mailto:joshua.micah.roper@gmail.com">
                    <TextAnimation text={`Joshua.micah.roper@gmail.com`} />
                </a>
            </div>
            <div class="text-cta">
                <p class="title">
                    View Resume
                </p>
                <a href="./pdfs/resume-joshua-roper.pdf" download>
                    <TextAnimation text={`Download PDF`} />
                </a>
            </div>
        </div>
    </div>
    <div class="bottom-row container">
        
        <p class="copyright">@ {new Date().getFullYear()} Joshua Roper Development</p>
        <div class="social-icons">
            <a href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="_blank" rel="noopener" >
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="_blank" rel="noopener" >
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" >
                <i class="fas fa-envelope"></i>
            </a>
        </div>
    </div>
</footer>

<ContactModal on:click={() => showModal = false} showModal={showModal}/>