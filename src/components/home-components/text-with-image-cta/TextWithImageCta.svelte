<script>
import TextAnimation from '../../common-components/TextAnimation.svelte';
import ContactModal from '../../common-components/modals/ContactModal.svelte';

    let showModal;

    function openModal(){
        showModal = true;
    }
</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    section {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        margin: 10% auto 10% auto;
        position: relative;
        z-index: 0;
        max-width: 100%;

        @media (min-width: breakpoint(sm)) {
            flex-direction: row-reverse;
            justify-content: space-between;
            width: 100%;
            margin: 12.5% auto 12.5% auto;
        }

        @media (min-width: breakpoint(lg)) {
            width: 80%;
            // margin: 15% auto 15% auto;
        }
    }

    .image-container, .text-content {
        width: 100%;

        @media (min-width: breakpoint(sm)) {
            width: calc(50% + 25px);
        }

        @media (min-width: breakpoint(md)) {
            width: calc(50% + 40px);
        }

        @media (min-width: breakpoint(lg)) {
            width: 50%;
        }
    }

    .image-container {
        
        box-shadow: 3px 3px 3px color(accentSecondary);
        transform: translateY(0px);
        transition: box-shadow .3s ease, transform .3s ease;
        height: 200px;
        width: 250px;
        width: 100%;
        // width: 800px;
        // margin-bottom: 100px;

        @media (min-width: breakpoint(sm)) {
            width: 40%;
            height: 275px;
        }

        @media (min-width: breakpoint(md)) {
            height: 400px;
        }
        &:hover {
            transform: translateY(-4px);
            box-shadow: 5px 5px 5px color(accentSecondary);
        }
    }

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .text-content {
        
        // padding: 25rem 30rem;
        padding-bottom: 15rem;
        position: relative;
        right: 0;
        z-index: -1;
        max-width: 100%;
        // border: 1px solid #797777;

        @media (min-width: breakpoint(sm)) {
            padding: 25rem 30rem;
            box-shadow: 3px 3px 3px 3px color(accentSecondary);
            background: white;
        }

        @media (min-width: breakpoint(md)) {
            padding: 35rem 40rem;
        }

        @media (min-width: breakpoint(lg)) {
            padding: 45rem 40rem;
            width: 530px;
            right: -40px;
        }
    }

    .heading {
        font-size: 13rem;
        font-weight: 800;
        text-transform: uppercase;
        max-width: 250px;

        @media (min-width: breakpoint(md)) {
            font-size: 23rem;
            max-width: 400px;
        }
    }

    .subheading {
        display: flex;
        align-items: center;
        font-size: 12rem;
        font-weight: 100;
        font-style: italic;
        margin-top: 10rem;
        margin-bottom: 10rem;
        color:#58595b;

        @media (min-width: breakpoint(md)) {
            font-size: 16rem;
        }

        &::before {
            content: '';
            display: block;
            width: 20px;
            margin-right: 10rem;
            height: 2px;
            background: #58595b;
        }
    }

    p {
        text-indent: 10px;
    }

    .button {
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
        color: #989898;
        font-weight: 300;
        font-style: italic;

        @media (min-width: breakpoint(md)) {
            font-size: 14rem;
        }
    }
</style>

<section class="text-with-image-cta">
    <a on:click={openModal} href="javascript:void(0)" class="image-container">
        <img src="images/desk-photo.jpeg" alt="A programming desk setup">
    </a>
    <div class="text-content">
        <h2 class="heading">Let's Create Something Awesome Together.</h2>
        <h3 class="subheading">Front End Developer | Desk Enthusiast</h3>
        <p>
            I have a real passion for development, and innovation. I love seeing projects come to life as I leverage my knowledge of design patterns to render aesthetically pleasing, and extremely viable digital experiences. I'm driven by seeing solutions come together across development & design processes.
        </p>

        <a class="button" on:click={openModal} href="javascript:void(0)">
            <TextAnimation text={`Get In Touch`} />
        </a>
    </div>
</section>

<ContactModal on:click={() => showModal = false} showModal={showModal}/>