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

    @keyframes badSlideInRight {
        0% {
            left: -100%;
        }
        100% {
            left: 0;
        }
    }
    div:not(.page-header) {
        display: flex;
        justify-content: flex-end;
        width: 65%;
        margin: -05px 0px 20px 0;
        font-size: 16rem;
        text-transform: uppercase;
        /* color: gray; */
        color: #58595b;
        /* overflow-x: hidden; */
        
        max-width: 900px;
    }

    div.side-page {
        font-size: 12rem;
        max-width: 1705px;
    }
    @media screen and (min-width: 40em){
        div.title-container:not(.side-page){
            margin-bottom: 20px;
            position: relative;
            animation: .9s ease-out 0s 1 fadeIn forwards;
        }
        div:not(.page-header) {
            font-size: 28rem;
            width: 75%;
        }
        div.side-page {
            font-size: 24rem;
            width: 85%
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
        margin: 0px;
        animation: 1s ease-out 0s 1 slideInRight forwards;
    }
    div.page-header{
        position: relative;
        width: 100vw;
        /* background: rgba(34, 34, 34, .092); */
         /* background: rgba(34, 34, 34, 0.022); */
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


    span{
        position: absolute;
        transform: scaleX(-1);
        transform: scaleX(-1) rotate(180deg) skew(-10deg, 0deg);
        opacity: .03;
        bottom: -55px;
        /* left: -50%; */
        left: 5px;
        font-size: 2em;
         animation: 1s ease-out 0s 1 badSlideInRight;
    }

</style>
<div class="page-header">
    <div class='title-container {sidePage}'>
        <h1>{title}</h1>
        <span>{title}</span>
    </div>
</div>