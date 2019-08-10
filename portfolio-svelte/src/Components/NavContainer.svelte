<script>
import NavItem from './NavItem.svelte';
import HamburgerIcon from './HamburgerIcon.svelte';

let navItems = [
    {
        name: 'about',
        url: ''
    },
    {
        name: 'portfolio',
        url: ''
    },
    {
        name: 'contact',
        url: ''
    }
]
</script> 
<style>
aside {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: flex-end
}

nav {
    transform: rotate(90deg);
    /* padding: 8rem 0rem 6rem 0rem; */
    height: 125px;
    display: flex;
    flex-direction: row-reverse;
    /* justify-content: center; */
    align-items: center;
    margin: 0rem 1.5rem 0rem 0rem;
}

ul {
    /* margin-top: -7rem; */
    position: absolute;
    display: flex;

    margin-right: 2rem;
}

ul li {
    position: relative;
    list-style-type: none;
    display: flex;
    align-items: center;
    opacity: 0;
    bottom: 15px;
    transition: all .7s ease;
}
 .hamburger-check:checked ~ ul li:nth-child(3) { transition-delay: .25s }
 .hamburger-check:checked ~ ul li:nth-child(3) span { transition-delay: .05s }
 .hamburger-check:checked ~ ul li:nth-child(2) { transition-delay: .5s }
 .hamburger-check:checked ~ ul li:nth-child(3) span { transition-delay: .3s }
 .hamburger-check:checked ~ ul li:nth-child(1) { transition-delay: .75s }
 .hamburger-check:checked ~ ul li:nth-child(1) span { transition-delay: .55s }

span.nav-separator{
    display: inline-block;
    border-bottom: 1px solid #00E2FF;
    width: 20px;
    margin: .5rem;
    opacity: 0;
}
.hamburger-check:checked ~ ul li {
    opacity: 1;
    bottom: 0px
}
.hamburger-check:checked ~ ul li span{
    /* position: relative; */
    opacity: 1;
    /* bottom: -10px; */
}

/* set height for NavItem hover */
li:hover {
    height: 150px;
}

/* li:hover span.nav-separator{
    height: 50px;
} */

</style>
<aside>
    <nav>
        <HamburgerIcon />
        <ul>
            {#each navItems as navItem}
                <li class="align-center">
                     <NavItem name={navItem.name} url={navItem.url}/> <span class="nav-separator"/>
                </li>
            {/each}
        </ul>
      
    </nav>
</aside>