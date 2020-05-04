<script>
    import { stores } from '@sapper/app';
    const { page } = stores();
    $: {
        if (typeof gtag !== "undefined"){
        gtag("config", "UA-89058156-2", {
            page_path: $page.path
        });
        }
    }
</script>