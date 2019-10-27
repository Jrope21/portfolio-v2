<script>
export let projectName, url;
</script>

<style>

    a{
        display: flex;
        align-items: center;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 12rem;
        width: fit-content;
        margin-top: 10rem;
        color: #989898;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-style: italic;
    }
    h2 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0rem 5rem 0rem;
        font-size: 13rem;
        font-weight: 900;
        text-transform: capitalize;
        transition: all .2s ease-in-out;
    }

    p{
        position: relative;
        line-height: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
        text-indent: 10px;
    }

    p::before{
        
        content: '2019';
        position: absolute;
        font-weight: 900;
        /* was .6 opacity */
        opacity: .7;
        z-index: -1;
        left: -60px;
        top: 30px;
        transform: rotate(-90deg);
        color: #e6e7e8;
        font-size: 45px;

    }

    @media screen and (min-width: 40em) {
        h2 {
            margin-top: 0rem;
        }
    }

</style>
<div>
    <h2>{projectName}</h2>
    <p>
        Temporibus similique eligendi, enim eum, suscipit facilis at et doloribus quidem necessitatibus repudiandae, nulla distinctio earum facere!
     Temporibus similique eligendi, enim eum, suscipit facilis at et doloribus quidem necessitatibus repudiandae, nulla distinctio earum facere!
    </p>
    <a href="{url}">
        View Website
    </a>
</div>