<script>
    export let text, header;
</script>

<style>
    /* h3 {
        font-weight: 500;
        font-size: 12rem;
        margin-bottom: 10rem;
        text-transform: uppercase;
    } */
    p {
        font-size: 12rem;
    }

    /* @media screen and (min-width: 40em){
        div {
            width: 40%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    } */
    p{
        line-height: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 13rem;
        color: #58595b;
        text-indent: 10px;
        max-width: 350px;
    }
</style>

<div>
    <h3>{header}</h3>
    <p>{text}</p>
</div>