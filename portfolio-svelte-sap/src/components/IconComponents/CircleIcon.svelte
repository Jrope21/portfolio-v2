<script>

</script>

<style>

.circleIcon{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    min-height: 20px;
    min-width: 20px;
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

<span class="circleIcon"></span>