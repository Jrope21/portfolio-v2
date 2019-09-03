<script>
    import HeroImage from './PortfolioNestedPageComponents/HeroImage.svelte';
    import TextInfo from './PortfolioNestedPageComponents/TextInfo.svelte';

let headerCta = `
    Working with a high traffic website.
`
let textCta = `
Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quas maxime explicabo pariatur praesentium molestiae?
`
</script>

<style>
div.text-container {
    margin-bottom: 20rem;
}
     @media screen and (min-width: 40em){
         div.text-container{
             margin:0px;
         }
         div.flex-container{
            display: flex;
            justify-content: space-between;
            width: 100%;
         }
        div:not(.flex-container) {
            width: 47%;
            min-height: 100%;
            /* display: flex; */
            align-items: center; 
            justify-content: center;
            flex-direction: column;
        }
    }
</style>
<div class="flex-container">
    <div class="text-container">
        <TextInfo header={headerCta} text={textCta} />
    </div>
    <div>
        <HeroImage src={'/images/uptexas/lgImg.png'} />
    </div>
</div>