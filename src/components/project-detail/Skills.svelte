<script>

</script>

<style>

    div {
        display: flex;
        flex-direction: column;
        margin: 40rem 0;
    }
    
    @media screen and (min-width: 40em){
        div{
            margin: 50rem 0;
        }
    }

    h3 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0rem 0rem 15rem 0rem;

        font-size: 13rem;
        font-weight: 900;
        text-transform: capitalize;
        transition: all .2s ease-in-out;
        color: #3B3B3B;
        z-index: 2;
        
    }

    @media screen and (min-width: 40em){
        h3 {
            width: 18%;
        }
    }

    @media screen and (min-width: 64em){
        h3 {
            font-size: 23rem;
            width: 20%;
        }
    }

    ul.skills{
        padding-left: 10px;
        position: relative;
        top: 10rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and (min-width: 40em){
        ul.skills{
            width: 60%;
        }
    }

    ul.skills::before {
        content: '';
        height: 100%;
        position: absolute;
        border-left: 3px solid #e6e7e8;
        opacity: .4;
    }

    p {
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
    }

    
    li {
        width: 100%;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
        margin: 0rem 0rem 25rem 0rem;
        padding: 0rem 0rem 0rem 0rem;
        display: flex;
        align-items: center;
        margin-left: -2px;
        height: 0;
        z-index: 2;
    }


    @media screen and (min-width: 64em){
        li {
            font-size: 18rem;
        }
    }

    span {
        color: #414042;
        font-weight: 500;
    }

    ul li:last-child {
        margin-bottom: 0rem;
    }

    li::before {
        content: '';
        width: 7px;
        height: 7px;
        background: #58595b;
        margin-right: 10rem;
        border-radius: 100%
    }

</style>

<div>
    <h3>
        Technology
    </h3>
        <ul class="skills">
            <li>JavaScript</li>
            <li>jQuery</li>
            <li>CSS</li> 
            <li>HTML (WCAG 2.1)</li>
            <li>WordPress</li>
            <li>Divi Builder</li>
            <li>Adobe Suite</li>
            <li>SEO</li>
            <li>Usability Testing</li> 
            <li>HTML (WCAG 2.1)</li>
            <li>HTML Emails</li>
            <li>GitHub / BitBucket</li>
            <li>WordPress / Kentico</li>
            <li>Adobe Suite</li>
            <li>SEO</li>
            <li>Usability Testing</li> 
        </ul>
</div>