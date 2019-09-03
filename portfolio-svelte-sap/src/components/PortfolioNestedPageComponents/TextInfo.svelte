<script>
    export let text, header;
</script>

<style>
    h3 {
        font-weight: 500;
        font-size: 12rem;
        margin-bottom: 10rem;
        text-transform: uppercase;
    }
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
</style>

<div>
    <h3>{header}</h3>
    <p>{text}</p>
</div>