<script>
export let title, sidePage;
// sidePage should be set to 'side-page' to toggle class
</script>

<style>
    @keyframes slideInRight {
        0% {
            /* transform: translateX(0%); */
        }
        100% {
            transform: translateX(100%);
        }
    }
    div:not(.page-header) {
        display: flex;
        justify-content: flex-end;
        width: 65%;
        margin: -05px 0px 20px 0;
        font-size: 16rem;
        text-transform: uppercase;
        color: gray;
        overflow: hidden;
        max-width: 900px;
    }


    /* testing white background on header */
    /* div::before{
        content: '';
        position: absolute;
        background: white;
        width: 100vw;
        right: 0;
        top: 0;
        height: 07%;
    } */

    div.side-page {
        font-size: 12rem;
    }
    @media screen and (min-width: 40em){
        div.title-container:not(.side-page){
            /* margin-bottom: 60px; */
            margin-bottom: 20px;
        }
        div.side-page {
            /* margin-bottom: 40px; */
        }
        div:not(.page-header) {
            font-size: 28rem;
            width: 75%;
        }
        div.side-page {
            font-size: 24rem;
        }
    }
    h1 {
        position: relative;
        width: 100%;
        top: 0;
        left: -100%;
        right: 0px;
        display: flex;
        align-items: center;
        /* transform: translateX(100%); */
        margin: 0px;
        animation: 1s ease-out 0s 1 slideInRight forwards;
    }
    div.page-header{
        position: relative;
        width: 100vw;
        /* background-color: rgba(34, 34, 34, .115); */
        background: rgba(34, 34, 34, .092);
        height: 125px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    @media screen and (min-width: 40em){
        div.page-header {
            height: 220px;
        }
    }

    @media screen and (min-width: 64em){
        div.page-header {
            height: 250px;
        }
    }

</style>
<div class="page-header">
    <div class='title-container {sidePage}'>
        <h1>{title}</h1>
    </div>
</div>