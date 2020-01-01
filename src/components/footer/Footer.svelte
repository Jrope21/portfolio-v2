<script>
import TextAnimation from '../helperComponents/TextAnimation.svelte';

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
    padding-bottom: 0;
}

@media screen and (min-width: 40em){
    .footer-container {
        flex-direction: row;
    }
}

.left, .right {
    margin-bottom: 55rem;
}

@media screen and (min-width: 40em){
    .left, .right {
        margin-bottom: 60rem;
    }
    .bottom-row {
        display: flex;
        /* flex-direction: row-reverse; */
    }
    .left, .copyright{
        padding-right: 80rem;
        width: 60%;
    }
    .right {
        padding-top: 20rem;
    }
}

@media screen and (min-width: 64em){
    .left, .copyright {
        width: 50%;
    }
    .left, .right {
        margin-bottom: 70rem;
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
    max-width: 420px;
}

.headline a {
    color: #58595b;
    transition: all .45s ease-in-out;
    opacity: .75;
}

.headline a:hover {
    color: black;
}

.title {
    font-weight: 100;
    font-size: 12rem;
}

.text-cta a {
    font-size: 14rem;
}

.bottom-row {
    padding-top: 0;
}

.copyright {
    font-size: 12rem;
    font-style: italic;
    font-weight: 300;
}

.left p:last-child {
    color: #58595b;
    font-size: 18px;
    font-weight: 900;
    font-style: italic;
    margin-top: 25rem;
}

div.social-icons {
    margin-top: 8px;
    min-width: 206px;
}

i {
    font-size: 14px;
    margin-right: 8px;
    color: #808080;
    transition: all .3s ease;
}

a:hover > i {
    transform: translateY(-3px);
    color: #58595b;
}

@media screen and (min-width: 40em) {
    div.social-icons {
        margin: 0;
    }
    i{
        font-size: 18px;
        margin-right: 10px;
    }
    .left p:last-child {
        margin-top: 60rem;
    }

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
        max-width: 440px;
    }
    .left p:last-child {
        font-size: 20px;
        margin-top: 70rem;
    }
}

</style>

<svelte:head>
    <script src="https://kit.fontawesome.com/1309990c29.js"></script>
</svelte:head>

<footer>
    <div class="container footer-container">
        <div class="left">
            <p class="headline">
                Feel free to shoot me an <a href="mailto:joshua.micah.roper@gmail.com">email</a> & connect through <a href="https://www.linkedin.com/in/jr-dev" target="blank">social.</a>
            </p>
            <p>Reach out!</p>
        </div>
        <div class="right">
            <div class="text-cta">
                <p class="title">
                    Get In Touch!
                </p>
                <a href="mailto:joshua.micah.roper@gmail.com">
                    <TextAnimation text={`Joshua.micah.roper@gmail.com`} />
                </a>
            </div>
            <div class="text-cta">
                <p class="title">
                    View Resume
                </p>
                <a href="./images/resume-joshua-roper.pdf" download>
                    <TextAnimation text={`Download PDF`} />
                </a>
            </div>
        </div>
    </div>
    <div class="bottom-row container">
        
        <p class="copyright">@ 2019 Joshua Roper Development</p>
        <div class="social-icons">
            <a href="https://www.github.com/Jrope21" aria-label="link to Joshua Roper's GitHub account" target="blank" >
                <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/JR-dev" aria-label="link to Joshua Roper's LinkedIn account" target="blank" >
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="mailto:joshua.micah.roper@gmail.com" aria-label="link to send Joshua Roper an email" target="blank" >
                <i class="fas fa-envelope"></i>
            </a>
        </div>
    </div>
</footer>


