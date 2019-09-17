<script>
    import PageHeader from '../../components/IconComponents/PageHeader.svelte';
    import { fadeIn, fadeOut } from '../../components/PageFade';
    import { onMount } from 'svelte';

    import SidePageHeroSection from '../../components/SidePageHeroSection.svelte';
    import SidePageTextLgImageSection from "../../components/SidePageTextLgImageSection.svelte";
    import SidePageResponsiveImgSection from '../../components/SidePageResponsiveImgSection.svelte';
    import SidePageSkillsSection from '../../components/SidePageSkillsSection.svelte';
    import SideBarSection from '../../components/SideBarSection.svelte';


    let textHero = `
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo vel quae veritatis doloribus voluptatibus iure expedita accusantium ipsa, veniam ad. Aliquid, tempora nostrum. Laboriosam, praesentium!
        `
    let headerCta = `
        Working with a high traffic website.
    `
    let textCta = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quas maxime explicabo pariatur praesentium molestiae?
    `

    let responsiveImg = {
        mobileSrc: '/images/wbuh/www.webuyuglyhouses.com_peace-of-mind-new-leaf-b_(iPhone 6_7_8).png',
        tabletSrc: '/images/wbuh/www.webuyuglyhouses.com_peace-of-mind-new-leaf-b_(iPad).png',
        desktopSrc: '/images/wbuh/www.webuyuglyhouses.com_peace-of-mind-new-leaf-b_(iPad Pro).png'
    }


    let skills = [
        {
            name: 'HTML5'
        },
        {
            name: 'CSS3'
        },
        {
            name: 'SASS'
        },
        {
            name: 'Foundation'
        },
        {
            name: 'JavaScript'
        },
        {
            name: 'jQuery'
        },
        {
            name: 'Kentico CMS'
        },
    ]

    let projects = [
        {
            url: '',
            imgSrc: 'images/bub.jpeg',
            projectName: 'Creative Revolt'
        },
        {
            url: '',
            imgSrc: 'images/WBUH.jpeg',
            projectName: 'HomeVestors'
        },
        {
            url: '',
            imgSrc: 'images/university-park-cta.jpeg',
            projectName: 'ANBTX'
        },
    ]

    let x = .25;
    let sections = [];

    onMount(()=>{
        for(let i = 0; i < sections.length; i++){
            let fadeInOrder = () => {
                
                sections[i].style.animation = `${'1'}s ease-in ${x}s 1 fadeInLeft forwards`;
                x += .35;

            }
            fadeInOrder();
        }
    })
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        padding: 8% 0 0% 0;
        position: relative;
        color: gray;
    }
    @media screen and (min-width: 64em) {
        section{
            flex-direction: row;
            justify-content: center;
            align-items: unset;
            flex: 1;
        }
    }

    section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        /* background: rgba(34, 34, 34, 0.082); */
        background: rgba(34, 34, 34, 0.022);
        z-index: -1;
    }
    .container {
        width: 65%;
        margin-bottom: 40rem;
        opacity: 0;
        max-width: 900px;
    }
    @media screen and (min-width: 40em){
        .container {
            width: 75%;
            margin-bottom: 100rem;
        }
    }
    a {
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
    }


    div.projects-container {
        width: 100%;
        display:flex;
        align-items: center;
        flex-direction: column;
    }
    div.lead-form-container {
        
        position: relative;
        width: 100vw;
        /* height: 100%; */
        display:flex;
        align-items: center;
        flex-direction: column;
    }

    div.lead-form-container::before{
       
        content: '';
        position:absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(34, 34, 34, .1);
        z-index: -1;
        /* padding-bottom: 10%; */
    
    }


    @media screen and (min-width: 64em) {
        div.projects-container {
            width: 65%;
            flex: 1;
        }
        div.lead-form-container {
            position: unset;
            width: 35%;
            display: flex;
        }
        div.lead-form-container::before{
            width: 35%;
            flex: 1;
        }
    }

</style>

<PageHeader sidePage={'side-page'} title={'HomeVestors'} />
<section in:fadeIn>
    <div class="projects-container">
        <div bind:this={sections[0]} class="container">
            <SidePageHeroSection heroSrc={'/images/wbuh/www.webuyuglyhouses.com_peace-of-mind-new-leaf-b_.png'} textHero={textHero} header={headerCta} text={textCta} />
        </div>
        <div bind:this={sections[1]} class="container">
            <SidePageTextLgImageSection textCta={textCta} headerCta={headerCta} lgImg={'/images/wbuh/www.webuyuglyhouses.com_peace-of-mind-new-leaf-b_ (1).png'}  />
        </div>
        <div bind:this={sections[2]} class="container">
            <SidePageResponsiveImgSection mobileSrc={responsiveImg.mobileSrc} tabletSrc={responsiveImg.tabletSrc} desktopSrc={responsiveImg.desktopSrc} />
        </div>
        <div bind:this={sections[3]} class="container">
            <SidePageSkillsSection skills={skills}/>
        </div>
    </div>
    <div class="lead-form-container">
       <SideBarSection projects={projects} />
    </div>
</section>