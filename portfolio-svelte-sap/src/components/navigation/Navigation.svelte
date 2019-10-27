<script>
import Hamburger from './Hamburger.svelte';
</script>

<style>

header {
    border-bottom: 1px solid #d6d6d6;
}

nav {
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    align-items: center;
    padding: 20rem 20rem;
}

ul.navigation {
    display: none;
}

@media screen and (min-width: 75em) {
    ul.navigation{
        display: flex;
    }
}

a {
    text-transform: uppercase;
}

</style>

<header>
    <nav class="container">
        <div class="logo">
            <p>
                <span class="code">&lt;h1&gt;</span> <span class="code">&lt;/h1&gt;</span>
            </p>
        </div>
        <Hamburger />
        <ul class="navigation">
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Contact</a></li>
        </ul>
    </nav>
</header>