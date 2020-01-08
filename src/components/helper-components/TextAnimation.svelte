<script>
export let text;

</script>

<style>

span.hover-animation {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-right: 30px;
}

span.hover-animation::before {
    content: '';
    position: absolute;
    border-bottom: 2px solid;
    width: 20px;
    transform: translate(-100%);
    display: block;
    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

span.hover-animation > span.text-animation {
    transition: all .45s cubic-bezier(0.85, 0.08, 0.08, 0.99);
}

a:hover > span.hover-animation::before {
    content: '';
    transform: translate(0);
    width: 20px;
    margin-right: 5px;
}

a:hover > span.hover-animation > span.text-animation {
    transform: translate(30px);
}

</style>

<span class="hover-animation">
    <span class="text-animation">{text}</span>
</span>