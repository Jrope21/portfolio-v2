<script>
import PageHeader from '../../components/IconComponents/PageHeader.svelte';

import SidePageHeroSection from '../../components/SidePageHeroSection.svelte';
import SidePageTextLgImageSection from "../../components/SidePageTextLgImageSection.svelte";
import SidePageResponsiveImgSection from '../../components/SidePageResponsiveImgSection.svelte';
import SidePageSkillsSection from '../../components/SidePageSkillsSection.svelte';

</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10% 0 0% 0;
        position: relative;
        color: gray;
    }
    section::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(34, 34, 34, 0.082);
        z-index: -1;
    }
    .container {
        width: 65%;
        margin-bottom: 40rem;
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
</style>


<section>
    <PageHeader sidePage={'side-page'} title={'University Park'} />
    <div class="container">
        <SidePageHeroSection />
    </div>
    <div class="container">
        <SidePageTextLgImageSection />
    </div>
    <div class="container">
        <SidePageResponsiveImgSection />
    </div>
    <div class="container">
        <SidePageSkillsSection />
    </div>
</section>