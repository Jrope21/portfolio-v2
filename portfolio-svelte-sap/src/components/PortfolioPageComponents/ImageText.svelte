<script>
import CircleIcon from '../IconComponents/CircleIcon.svelte';
import TextUnderline from '../IconComponents/TextUnderline.svelte';
export let projectName;
</script>

<style>
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
h2 {
        position: relative;
        display: flex;
        align-items: center;
        margin: 15rem 0rem 10rem 0rem;
        font-size: 12rem;
        font-weight: 300;
        text-transform: uppercase;
        transition: all .2s ease-in-out;
    }
</style>
<div>
    <h2>{projectName}</h2>
    <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus similique eligendi, enim eum, suscipit facilis at et doloribus quidem necessitatibus repudiandae, nulla distinctio earum facere!
    </p>
    <a href="">
        <CircleIcon /> <TextUnderline text={'View More'} />
    </a>
</div>