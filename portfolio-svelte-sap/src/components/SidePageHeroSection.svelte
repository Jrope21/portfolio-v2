<script>
    import TextUnderline from './IconComponents/TextUnderline.svelte';
    import HeroImage from './PortfolioNestedPageComponents/HeroImage.svelte';
    import HeroText from './PortfolioNestedPageComponents/HeroText.svelte';
    let textHero = `
        A beautiful website built for the City of University Park. 
        With over 100 pages it includes a dynamic content slider, form verification, multiple third party integrations, and much more.
    `
</script>

<style>
    a {
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
    }
</style>

<HeroText text={textHero}/>
<a href=""><TextUnderline text={'View Website'} /></a>
<HeroImage src={'/images/uptexas/desktop.png'} />