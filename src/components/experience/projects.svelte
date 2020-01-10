<script>

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    .project-listing {
        margin-bottom: 20rem;

        @media (min-width: breakpoint(sm)) {
            box-sizing: border-box;
            width: 50%;
            padding-right: 30rem;
        }
    }
    
    .detail-title {
        margin: 0;
    }

    .detail-web-links {
        margin: 3rem 0;
    }

    @media (min-width: breakpoint(sm)){
        .projects-container {
            display: flex;
            flex-wrap: wrap;
        }
    }

</style>

<section>
    <h2 class="headline">Projects</h2>
    <div class="projects-container">
        <div class="project-listing">
            <p class="detail-preface skills-listing">Svelte, Sapper, JavaScript, Rollup, SASS, HTML</p>
            <h3 class="detail-title">Personal Portfolio</h3>
            <div class="detail-web-links">
                <a href="https://www.joshuaroper.com/" target="_blank">joshuaroper.com</a>
            </div>
            <p>
                I created a personal portfolio website to showcase all of my recent works. I utilized advanced CSS animations, Svelte, and a static Sapper build.
            </p>
        </div>
        <div class="project-listing">
            <p class="detail-preface skills-listing">React, React Static, JavaScript, WebPack, SASS, JSX, WordPress</p>
            <h3 class="detail-title">Halcyon</h3>
            <div class="detail-web-links">
                <a href="https://www.visithalcyon.com/" target="_blank">visithalcyon.com</a>
            </div>
            <p>
                As one of the Front End Developers on the project I was tasked with creating the movies, and events directory. I worked with multiple API’s, React Static, and developed clean code.
            </p>
        </div> 
        <div class="project-listing">
            <p class="detail-preface skills-listing">JavaScript, jQuery, SASS, Foundation, HTML, Kentico (CMS)</p>
            <h3 class="detail-title">University Park</h3>
            <div class="detail-web-links">
                <a href="https://www.uptexas.org/" target="_blank">uptexas.org</a>
            </div>
            <p>
                I was the sole Front End Developer on the project, I implemented a dynamically generated content slider, filtered search, form verification, and multiple third party integrations.
            </p>
        </div>
        <div class="project-listing">
            <p class="detail-preface skills-listing">HTML, CSS, JavaScript, Jquery, WordPress, DiviBuilder</p>
            <h3 class="detail-title">Creative Revolt</h3>
            <div class="detail-web-links">
                <a href="https://www.creativerevolt.com/" target="_blank">creativerevolt.com</a>
            </div>
            <p>
                This was a freelance project to completely rework the website layout and tailor the feel of the website to her personal writing style.
            </p>
        </div>
    </div>
</section>