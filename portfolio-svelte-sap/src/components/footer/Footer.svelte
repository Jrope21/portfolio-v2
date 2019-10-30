<script>

</script>

<style>
footer {
    border-top: 1px solid #d6d6d6;
    background: white;
    color: #3B3B3B;
}

.footer-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
}

@media screen and (min-width: 40em){
    .footer-container {
        flex-direction: row;
    }
}

.left, .right {
    margin-bottom: 40rem;
}

@media screen and (min-width: 40em){
    .left{
        padding-right: 80rem;
        width:60%;
    }
    .right {
        padding-top: 20rem;
    }
}

@media screen and (min-width: 64em){
    .left {
        width: 50%;
    }
}

.text-cta:first-of-type {
    margin-bottom: 20rem;
}

.headline {
    font-size: 40px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    line-height: 45px;
    font-weight: 700;
    max-width: 400px;
}

.headline a {
    color: #58595b;
}

.title {
    font-weight: 100;
    font-size: 12rem;
}

.text-cta a {
    font-size: 14rem;
}

.copyright {
    font-size: 12rem;
    font-style: italic;
    font-weight: 300;
}

@media screen and (min-width: 64em){
    .title{
        font-size: 16rem
    }
    .text-cta a {
        font-size: 18rem;
    }
    .copyright {
        font-size: 14rem;
    }
    .headline {
        font-size: 45px;
    }
}

</style>

<footer>
    <div class="container footer-container">
        <div class="left">
            <p class="headline">
                Feel free to shoot me an <a>email</a> & connect on <a>social</a>
            </p>
            
        </div>
        <div class="right">
            <div class="text-cta">
                <p class="title">
                    Get In Touch!
                </p>
                <a>
                    Joshua.micah.roper@gmail.com
                </a>
            </div>
            <div class="text-cta">
                <p class="title">
                    View Resume
                </p>
                <a>
                    Download PDF
                </a>
            </div>
        </div>
    </div>
    <p class="copyright container">
        @ 2019 Joshua Roper Development
    </p>
</footer>