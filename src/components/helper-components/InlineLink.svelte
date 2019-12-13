<script> 
export let url, target, text;
</script>

<style>
a {
    color: #58595b;
    transition: all .45s ease-in-out;
    opacity: .75;
}

a:hover {
    color: black;
}
</style>

<a href="{url}" target={target}>{text}</a>