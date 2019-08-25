<script>
import NavItem from './NavItem.svelte';
import HamburgerIcon from './HamburgerIcon.svelte';
import { onMount } from 'svelte';
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
    align-items: flex-end;
    z-index: 2;
}

nav {
    transform: rotate(90deg);
    /* padding: 8rem 0rem 6rem 0rem; */
    height: 125px;
    display: flex;
    flex-direction: row-reverse;
    /* justify-content: center; */
    align-items: center;
    margin: 0rem 24px 0rem 0rem; /*same as 1.5rem*/
}

ul {
    /* margin-top: -7rem; */
    position: absolute;
    display: flex;

    margin-top: 11px; /*was 2rem*/
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
    /* border-bottom: 1px solid #00E2FF; */
    border-bottom: 1px solid gray;
    width: 20px;
    margin: 8px; /*same as .5rem*/
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

/* ul::after {
        content: '';
        position: absolute;
        display: inline-block;
        border-bottom: 1px solid #00E2FF;
        width: 25px;
        right: -100px;

        margin: 9px;
        opacity: 1;
        transition: all 1s ease-in-out;
}

.hamburger-check:checked ~ ul::after {
    right: -75px;
} */
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