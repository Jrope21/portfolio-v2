<script>
    import HeroImage from './PortfolioNestedPageComponents/HeroImage.svelte';
    import TextInfo from './PortfolioNestedPageComponents/TextInfo.svelte';

let headerCta = `
    Working with a high traffic website.
`
let textCta = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quas maxime explicabo pariatur praesentium molestiae?
`
</script>

<style>

</style>

<TextInfo header={headerCta} text={textCta} />
<HeroImage src={'/images/uptexas/sidenav.png'} />