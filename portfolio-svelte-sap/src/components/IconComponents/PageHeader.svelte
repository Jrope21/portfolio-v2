<script>
export let title, sidePage;
// sidePage should be set to 'side-page' to toggle class
</script>

<style>
    @keyframes slideInRight {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0%);
        }
    }
    div {
        display: flex;
        justify-content: flex-end;
        width: 65%;
        margin: -05px 0px 30px 0;
        font-size: 16rem;
        text-transform: uppercase;
        color: gray;
        overflow: hidden;
    }
    div.side-page {
        font-size: 12rem;
    }
    @media screen and (min-width: 40em){
        div {
            font-size: 28rem;
        }
    }
    h1 {
        top: 0;
        right: 0px;
        display: flex;
        align-items: center;
        transform: translateX(100%);
        margin: 0px;
        animation: 1s ease-out 0s 1 slideInRight forwards;
    }
</style>
<div class='{sidePage}'>
    <h1>{title}</h1>
</div>