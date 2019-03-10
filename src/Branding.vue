<template>
    <i v-if="youtube" class="fab fa-lg fa-youtube"></i>
    <i v-else-if="amazon" class="fab fa-lg fa-amazon"></i>
    <i v-else-if="spotify" class="fab fa-lg fa-spotify"></i>
    <i v-else-if="ebay" class="fab fa-lg fa-ebay"></i>
    <i v-else-if="github" class="fab fa-lg fa-github"></i>
    <i v-else-if="google" class="fab fa-lg fa-google"></i>
    <i v-else-if="stackoverflow" class="fab fa-lg fa-stack-overflow"></i>
    <i v-else-if="stackexchange" class="fab fa-lg fa-stack-exchange"></i>
    <i v-else-if="facebook" class="fab fa-lg fa-facebook"></i>
    <i v-else-if="pinterest" class="fab fa-lg fa-pinterest"></i>
    <i v-else-if="reddit" class="fab fa-lg fa-reddit"></i>
    <i v-else-if="steam" class="fab fa-lg fa-steam"></i>
    <i v-else-if="vimeo" class="fab fa-lg fa-vimeo"></i>
    <i v-else-if="whatsapp" class="fab fa-lg fa-whatsapp"></i>
</template>

<script>
    export default {
        name: 'Branding',
        props: ['url'],
        computed: {
            youtube: function () {
                return this.url.includes('youtube.com');
            },
            amazon: function () {
                return this.url.includes('.amazon.');
            },
            spotify: function () {
                return this.url.includes('.spotify.');
            },
            ebay: function () {
                return this.url.includes('.ebay.');
            },
            github: function () {
                return this.url.includes('github.com');
            },
            google: function () {
                return this.url.includes('google.com');
            },
            stackoverflow: function () {
                return this.url.includes('stackoverflow.com');
            },
            stackexchange: function () {
                return this.url.includes('stackexchange.com');
            },
            facebook: function () {
                return this.url.includes('facebook.com');
            },
            pinterest: function () {
                return this.url.includes('.pinterest.');
            },
            reddit: function () {
                return this.url.includes('reddit.com');
            },
            steam: function () {
                return this.url.includes('steampowered.com');
            },
            vimeo: function () {
                return this.url.includes('vimeo.com');
            },
            whatsapp: function () {
                return this.url.includes('whatsapp.com');
            }
        }
    }
</script>

<style scoped>

</style>