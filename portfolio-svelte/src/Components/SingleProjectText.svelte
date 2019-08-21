<script>

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
    text-decoration: underline;
    text-transform: uppercase;
    font-size: 12rem;
    width: fit-content;
    margin-top: 10rem;
}
a:hover .circleIcon{
    /* animation: .2s ease-in 0s 1 slightSpin forwards; */
    transform: rotate(90deg);
}
.circleIcon{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    /* margin-top: 15rem; */
    margin-right: 20rem;
    transition: all .3s ease-in-out;
    /* box-shadow: .5px .5px .5px black; */
}
.circleIcon::before{
    content: '';
    position: absolute;
    border-right: 1px solid gray;
    height: 10px;
    left: 50%;
    /* transform: rotate(45deg); */
}
.circleIcon::after{
    content: '';
    position: absolute;
    border-right: 1px solid gray;
    height: 10px;
    left: 50%;
    transform: rotate(-90deg);
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
    <a href=""><span class="circleIcon"></span>Projects</a>
</div>