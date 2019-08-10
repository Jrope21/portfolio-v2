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
    },
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
    list-style-type: none;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: all .7s ease;
}

span.nav-separator{
    display: inline-block;
    border-bottom: 1px solid #00E2FF;
    width: 15px;
    margin: .5rem;
    opacity: 0;
}
.hamburger-check:checked ~ ul li {
    opacity: 1;
}
/*
input {
    display: none;
}

label {
     position: absolute;
     left: 10px;
     bottom: 33px;
     transform: rotate(45deg);
     border: 1px solid #00E2FF;
     border-radius: 2px;
     height: 25px;
     width: 25px;
     display: flex;
     align-items: center;
     justify-content: center;
}
*/
/* setup hamburger lines 
span.hamburger{
    display: block;
    height: 15px;
    border-right: 1px solid #00E2FF;
    /* background: #00E2FF; 
}

span.hamburger::before{
    content: '';
    border-right: 1px solid #00E2FF;
    position: absolute;
    height: 15px;
    right: 18px;
}
span.hamburger::after{
    content: '';
    border-right: 1px solid #00E2FF;
    position: absolute;
    height: 15px;
    left: 18px;
}
*/

</style>
<aside>
    <nav>
    <HamburgerIcon />
      <!-- <input class="hide-for-medium" id="hamburger" name="hamburger" type="checkbox">
        <label class="hide-for-medium center-all" for="hamburger">
            <span class="hamburger"/>
        </label> -->
        <ul>
            {#each navItems as navItem}
                <li class="align-center">
                     <NavItem name={navItem.name} url={navItem.url}/> <span class="nav-separator"/>
                </li>
            {/each}
        </ul>
      
    </nav>
</aside>