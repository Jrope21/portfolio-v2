<script>
export let mobileSrc, tabletSrc, desktopSrc;
</script>

<style>
    div.images-container {
        display: flex;
        max-width: 100%;
        justify-content: space-between;

    }
    div.image-sizer {
        width: 15%;
        display: flex;
        align-items: flex-end;
    }
    div.image-sizer:nth-child(2){
        width: 30%
    }
    div.image-sizer:nth-child(3){
        width:35%
    }
    img {
        max-width: 100%;
        object-fit: contain;
    }
    
</style>

<div class="images-container">
    <div class="image-sizer">
        <img src="{mobileSrc}" alt="">
    </div>
    <div class="image-sizer">
        <img src="{tabletSrc}" alt="">
    </div>
    <div class="image-sizer">
         <img src="{desktopSrc}" alt="">
    </div>
</div>