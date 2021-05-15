<script>

</script>

<style lang="scss">
    @import '../../styles/global.variables.scss';

    div.job-listing {
        margin-bottom: 20rem;
    }
    
    li {
        margin: 5rem 0;

        @media (min-width: breakpoint(md)) {
            margin: 8rem 0;
        }
    }

    li::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background: gray;
        top: 7px;
        left: -10px;

        @media (min-width: breakpoint(md)) {
           top: 10px;
        }
    }

    li.detail {
        position: relative;
        margin-left: 15rem;
    }

    .detail-title {
        margin-bottom: 0px;
    }

</style>

<section>
    <h2 class="headline">Experience</h2>
    <div class="job-listing">
        <p class="date-location detail-preface">Denton, Texas (2020 - current)</p>
        <h3 class="job-title detail-title">Remote Front End Developer at Sally Beauty Holdings</h3>
        <div class="detail-web-links">
            <a class="h:text-underline" href="https://www.sallybeauty.com" rel="noopener" target="_blank">sallybeauty.com</a>,
            <a class="h:text-underline" href="https://www.cosmoprofbeauty.com" rel="noopener" target="_blank">cosmoprofbeauty.com</a>
        </div>
        <ul class="job-details">
            <li class="detail">
                Was a core contributor to a complete website redesign of CosmoProf
                <div class="detail-web-links">
                    <a class="h:text-underline" href="https://www.pilot.cosmoprofbeauty.com" rel="noopener" target="_blank">pilot.cosmoprofbeauty.com</a>
                </div>
            </li>
            <li class="detail">
               Developed and led multiple campaigns that launched at a global scale
            </li>
            <li class="detail">
                Designed and developed numerous templates utilizing SalesForce Commerce Cloud
            </li>
        </ul>
    </div>
    <div class="job-listing">
        <p class="date-location detail-preface">Dallas, Texas (2019 - current)</p>
        <h3 class="job-title detail-title">Freelance Front End Developement</h3>
        <ul class="job-details">
            <li class="detail">
                Helped architect a React based platform bringing multiple themes into a single cohesive template
            </li>
            <li class="detail">
               Developing the entire Front End for a multi billion dollar insurance company
            </li>
            <li class="detail">
                Redesigned Writing Revolt to optimize conversion, performance, and site security
            </li>
            <li class="detail">
                Designed and developed multiple Gatsby based themes with a strong focus on revenue generation
            </li>
        </ul>
    </div>
    <div class="job-listing">
        <p class="date-location detail-preface">Dallas, Texas (2019 - 2020)</p>
        <h3 class="job-title detail-title">Front End Developer at Imaginuity</h3>
        <div class="detail-web-links">
            <a class="h:text-underline" href="https://www.imaginuity.com" rel="noopener" target="_blank">imaginuity.com</a>
        </div>
        <ul class="job-details">
            <li class="detail">
                Developed the entire front end for multiple high-traffic websites
                <div class="detail-web-links">
                    <a class="h:text-underline" href="https://www.stallionoilfield.com/" rel="noopener" target="_blank">stallionoilfield.com</a>,
                    <a class="h:text-underline" href="https://www.uptexas.org" rel="noopener" target="_blank">uptexas.org</a>
                </div>
            </li>
            <li class="detail">
                Actively developed features and multiple templates for various corporate clients
                <div class="detail-web-links">
                    <a class="h:text-underline" href="https://www.webuyuglyhouses.com" rel="noopener" target="_blank">webuyuglyhouses.com</a>, 
                    <a class="h:text-underline" href="https://www.homevestors.com" rel="noopener" target="_blank">homevestors.com</a>, 
                    <a class="h:text-underline" href="https://www.advancial.org" rel="noopener" target="_blank">advancial.org</a>, 
                    etc...
                </div>
            </li>
            <li class="detail">
                Maintained 10 React based themes responsible for over 100 established malls
                <div class="detail-web-links">
                    <a class="h:text-underline" href="https://www.visithalcyon.com" rel="noopener" target="_blank">visithalcyon.com</a>,
                    <a class="h:text-underline" href="https://www.liberty-center.com/" rel="noopener" target="_blank">liberty-center.com</a>,
                    <a class="h:text-underline" href="https://www.windwardcity.com/" rel="noopener" target="_blank">windwardcity.com</a>,
                    etc...
                </div>
            </li>
            <li class="detail">
                Designed and integrated page templates utilizing a CMS (WordPress / Kentico)
            </li>
        </ul>
    </div>
    <div class="job-listing">
        <p class="date-location detail-preface">Carrollton, Texas (2017 - 2018)</p>
        <h3 class="job-title detail-title">Freelance Web Development and Marketing at Creative Revolt</h3>
        <div class="detail-web-links">
            <a class="h:text-underline" href="https://www.creativerevolt.com" rel="noopener" target="_blank">creativerevolt.com</a>
        </div>
        <ul class="job-details">
            <li class="detail">
                Revamped the design with a bolder color palette / layout
            </li>
            <li class="detail">
                Created the landing page and multiple sections utilizing WordPress (DiviBuilder)
            </li>
            <li class="detail">
                Performed website updates and executed content audits
            </li>
            <li class="detail">
                Adjusted the website for SEO and created marketable advertisements (Canva / Google Analytics)
            </li>
        </ul>
    </div>
</section>