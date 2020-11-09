<script>
import TextAnimation from '../../common-components/TextAnimation.svelte';

</script>

<style lang="scss">
    @import '../../../styles/global.variables.scss';

    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10% auto 10% auto;
        position: relative;

        // @media (min-width: breakpoint(sm)) {        
        //     width: 90%;
        // }

        @media (min-width: breakpoint(md)) {
            flex-direction: row;
            justify-content: space-between;
            // width: 85%;
        }

        @media (min-width: breakpoint(lg)) {
            width: 90%;
        }
    }

    .image-container, .text-content {
        width: 100%;

        @media (min-width: breakpoint(sm)) {
            width: 45%;
        }
    }

    .image-container {
        box-shadow: 3px 3px 3px color(accentSecondary);
        transform: translateY(0px);
        transition: box-shadow .3s ease, transform .3s ease;
        // height: 400px;
        // width: 800px;
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
        // background: white;
        // box-shadow: 3px 3px 3px color(accentSecondary);
        // padding: 40rem;
    }

    .heading {
        font-size: 28rem;
        font-weight: 800;
        text-transform: uppercase;
    }

    .subheading {
        display: flex;
        align-items: center;
        font-size: 16rem;
        font-weight: 100;
        font-style: italic;
        margin-top: 10rem;
        margin-bottom: 10rem;

        &::before {
            content: '';
            display: block;
            width: 20px;
            margin-right: 10rem;
            height: 2px;
            background: black;
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
    <div class="image-container">
        <img src="thumbnails/halcyon-5-min.jpg" alt="testing">
    </div>
    <div class="text-content">
        <h2 class="heading">Let's Create Something Awesome Together.</h2>
        <h3 class="subheading">Front End Developer | Desk Enthusiast</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem purus libero proin elit, consectetur vitae ut purus. Eu diam aliquam justo nam eget. Sollicitudin pharetra, quisque placerat vulputate. Vitae vestibulum tristique commodo aliquet suspendisse leo morbi velit tellus.
            <!-- <br /><br /> -->
            <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem purus libero proin elit, consectetur vitae ut purus. Eu diam aliquam justo nam eget. Sollicitudin pharetra, quisque placerat vulputate. Vitae vestibulum tristique commodo. -->
        </p>

        <a class="button" rel=prefetch href="">
            <TextAnimation text={`Get In Touch!`} />
        </a>
    </div>
</section>