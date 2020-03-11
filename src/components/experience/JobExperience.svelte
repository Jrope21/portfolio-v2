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
        <p class="date-location detail-preface">Dallas, Texas (2019 - current)</p>
        <h3 class="job-title detail-title">Front End Developer at Imaginuity</h3>
        <ul class="job-details">
            <li class="detail">
                Developed the entire Front End for multiple high traffic, 99% up time websites
                <div class="detail-web-links">
                    <a href="https://www.stallionoilfield.com/" rel="noopener" target="_blank">stallionoilfield.com</a>,
                    <a href="https://www.uptexas.org" rel="noopener" target="_blank">uptexas.org</a>
                </div>
            </li>
            <li class="detail">
                Made web enhancements and landing page’s for multiple businesses
                <div class="detail-web-links">
                    <a href="https://www.webuyuglyhouses.com" rel="noopener" target="_blank">webuyuglyhouses.com</a>, 
                    <a href="https://www.homevestors.com" rel="noopener" target="_blank">homevestors.com</a>, 
                    <a href="https://www.advancial.org" rel="noopener" target="_blank">advancial.org</a>, etc....
                </div>
            </li>
            <li class="detail">
                Maintained 10 React based themes responsible for over 90 established malls
                <div class="detail-web-links">
                    <a href="https://www.visithalcyon.com" rel="noopener" target="_blank">visithalcyon.com</a>,
                    <a href="https://www.liberty-center.com/" rel="noopener" target="_blank">liberty-center.com</a>,
                    <a href="https://www.windwardcity.com/" rel="noopener" target="_blank">windwardcity.com</a>,
                    etc....
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
            <a href="https://www.creativerevolt.com" rel="noopener" target="_blank">creativerevolt.com</a>
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