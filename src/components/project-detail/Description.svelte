<script>
import TextAnimation from '../helper-components/TextAnimation.svelte';

</script>

<style>
  a{
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
    }
    h2 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0rem 5rem 0rem;
        font-size: 13rem;
        font-weight: 900;
        text-transform: capitalize;
        transition: all .2s ease-in-out;
        color: #3B3B3B;
        z-index: 2;
    }

    p{
        position: relative;
        line-height: 16px;
        font-weight: 300;
        font-size: 13rem;
        z-index: 1;
        color: #58595b;
        text-indent: 10px;
    }

    @media screen and (min-width: 40em) {
        h2 {
            margin-top: 0rem;
        }
    }

@media screen and (min-width: 64em){
    h2 {
        font-size: 23rem;
    }
    p{
        font-size: 18rem;
        line-height: 21px;
    }
    a{
        font-size: 14rem;
    }
}
.text-container {
    position: sticky;
    top: 130px;
    width: 90%;
}

@media (min-width: 40em) {
    .text-container {
        width: 100%;
    }
}
</style>

<div class="text-container">
    <h2>Project Details</h2>
    <p>I was tasked with being the <strong>sole developer</strong> on a <strong>complete Front-End redesign</strong>. Keeping their current users in mind, the goal was to make the website feel more modern, and offer a better user experience when navigating to each individual page. Across the entire project I implemented several dynamically generated content pages / sliders, <strong>form verification</strong>, and several <strong>third party integrations</strong>.</p>
    <a target="blank" href="">
        <TextAnimation text={`View Website`} />
    </a>
</div>