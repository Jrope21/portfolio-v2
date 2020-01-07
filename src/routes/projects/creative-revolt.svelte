<script>
import PageTransition from '../PageTransition.svelte';
import AboutMe from '../../components/about/AboutMe.svelte'
import PageTitle from '../../components/project-detail/PageTitle.svelte';
import ImageGrid from '../../components/project-detail/ImageGrid.svelte';
import Description from '../../components/project-detail/Description.svelte'
</script>

<style lang="scss">
div.title-container {
    padding-bottom: 0;
}

h1 {
    width: fit-content;
    font-weight: 700;
}
h1.title {
        margin-top: 100px;
        color: #3B3B3B;
        font-size: 58px;
        font-weight: 700;
        padding-bottom: 0;
        
        margin-left: 0;
        margin-bottom: 60px;
        /* position: relative;
        width: 100%;
        top: 0; */
        /* left: -100%; */
        /* right: 0px;
        display: flex;
        font-size: 32px;
        align-items: center;
        margin: 0px;
        color: #3B3B3B;
        font-weight: 700; */
        /* animation: 1s ease-out 0s 1 slideInRight forwards; */
    }

    h1::after {
        content: '';
        margin-top: 1px;
        display: block;
        width: calc(100% + 35px);
        height: 1px;
        border-bottom: 8px solid lightgray;
    }

    @media screen and (min-width: 40em){
        h1 {
            font-size: 38px;
        }
    }

    @media screen and (min-width: 64em){
        h1 {
            font-size: 48px;
        }
    }

    p {
        font-size: 18rem;
        line-height: 23px;
        width: 700px;
    }

    h1.headline {
        font-size: 28rem;
        text-transform: uppercase;
        display: block;
        margin-bottom: 12px;
        font-weight: 600;
        width: fit-content;

        
    }
.container {
    // padding-top: 0;
}
    .inner-container {
        width: 90%;
        margin: 60px auto;
        font-weight: 300;
        color: #58595b;
    }
</style>

<svelte:head>
	<title>Creative Revolt | Front End Developer - Joshua Roper</title>
</svelte:head>


<div class="project-detail">
    <PageTransition>
    <div class="container">
        <PageTitle title={'Creative Revolt'} />
        
            <!-- <h1 class="title">Creative Revolt</h1> -->
        <!-- <section class="inner-container">
            <h1 class="headline">Summary</h1>
            <p>Hi There! I’m Josh, a Dallas-based Front End Developer with a knack for programing and design. My passion comes from bringing together each aspect of the customer journey across both development and design processes. I focus on creating production ready applications utilizing UX principals with scalable clean code.</p>
        </section> -->

<!-- <AboutMe /> -->
        <section class="">
            <ImageGrid />
        </section>
        
        
        </div>
    </PageTransition>
</div>