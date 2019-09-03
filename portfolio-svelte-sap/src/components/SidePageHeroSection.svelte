<script>
    import TextUnderline from './IconComponents/TextUnderline.svelte';
    import HeroImage from './PortfolioNestedPageComponents/HeroImage.svelte';
    import HeroText from './PortfolioNestedPageComponents/HeroText.svelte';
    let textHero = `
       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo vel quae veritatis doloribus voluptatibus iure expedita accusantium ipsa, veniam ad. Aliquid, tempora nostrum. Laboriosam, praesentium!
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
        margin-bottom: 20rem;
    }

    @media screen and (min-width: 40em){
        a {
            margin-bottom: 30rem;
        }
    }
</style>

<HeroText text={textHero}/>
<a href=""><TextUnderline text={'View Website'} /></a>
<HeroImage src={'/images/uptexas/hero.png'} />
