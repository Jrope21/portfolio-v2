<script>
import CircleIcon from '../IconComponents/CircleIcon.svelte';
import TextUnderline from '../IconComponents/TextUnderline.svelte';
</script>

<style>
h2, h3{
    text-transform: uppercase;
    font-size: 12rem;
    font-weight: 300;
}
h2{
    /* font-size: 12rem; */
    margin-bottom: 2rem;
    font-size: 13rem;
    font-weight: 600;
}
h3{
    margin-bottom: 5rem;
    font-size: 13rem;
    font-weight: 600;
}
p{
    /* font-size: 14rem;
    font-weight: 400; */
    text-indent: 10px;
    line-height: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 13rem;
    color: #58595b;
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
        color: #989898;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
}


</style>

<div>
    <h2>My Projects</h2>
    <h3>Innovative | Bold | Creative</h3>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Possimus, totam quos pariatur accusamus quisquam veniam! Dolor ullam quae praesentium suscipit molestiae 
        cumque temporibus eum.
        Possimus, totam quos pariatur accusamus quisquam veniam! Dolor ullam quae praesentium suscipit molestiae 
        cumque temporibus eum.
        totam quos pariatur accusamus quisquam veniam! Dolor ullam quae praesentium suscipit molestiae 
        cumque temporibus eum
    </p>
    <a href="portfolio"><CircleIcon /><TextUnderline text={'Projects'} /></a>
</div>