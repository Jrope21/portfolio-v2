<script>
import CircleIcon from './IconComponents/CircleIcon.svelte';
import TextUnderline from './IconComponents/TextUnderline.svelte';
</script>

<style>
h2, h3{
    text-transform: uppercase;
    font-size: 12rem;
    font-weight: 300;
}
h2{
    /* font-size: 12rem; */
    margin-bottom: 10rem;
}
h3{
    margin-bottom: 15rem;
}
p{
    font-size: 14rem;
    font-weight: 400;
}
a{
    display: flex;
    align-items: center;
    font-weight: 300;
    /* text-decoration: underline; */
    text-transform: uppercase;
    font-size: 12rem;
    width: fit-content;
    margin-top: 10rem;
}


</style>

<div>
    <h2>My Projects</h2>
    <h3>Innovative | Bold | Creative</h3>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Possimus, totam quos pariatur accusamus quisquam veniam! Dolor ullam quae praesentium suscipit molestiae 
        cumque temporibus eum
    </p>
    <a href=""><CircleIcon /><TextUnderline text={'Projects'} /></a>
</div>