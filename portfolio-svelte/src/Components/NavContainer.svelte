<script>
import NavItem from './NavItem.svelte';
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

}

nav {
    transform: rotate(90deg);
    padding: 8rem 0rem 6rem 0rem;
    display: flex;
    flex-direction: row-reverse;
    /* justify-content: center; */
    align-items: center;
    margin: 0rem -6rem 0rem 0rem;
}

ul {
    /* margin-top: -7rem; */
    display: flex;
    margin-right: 2rem;
}

ul li {
    list-style-type: none;
}

input {
    display: none;
}

label {
     position: absolute;
     right: 0;
     transform: rotate(45deg);
     border: 1px solid #00E2FF;
     border-radius: 2px;
     height: 25px;
     width: 25px;
     display: flex;
     align-items: center;
     justify-content: center;
}

span{
    display: block;
    height: 5px;
    border-right: 1px solid #00E2FF;
    /* background: #00E2FF; */
}


</style>
<aside>
    <nav>
      <input class="hide-for-medium" id="hamburger" name="hamburger" type="checkbox">
    <label class="hide-for-medium center-all" for="hamburger">
        <span/>
    </label>
        <ul>
            {#each navItems as navItem}
                <li>
                     <NavItem name={navItem.name} url={navItem.url}/>
                </li>
            {/each}
        </ul>
      
    </nav>
</aside>