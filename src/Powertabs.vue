<template>
    <div class="container">
        <h4>{{topSitesTitle}}</h4>
        <ol>
           <li v-for="site in topSites">
               <a v-bind:href="site.url">{{site.url}}</a>
           </li>
        </ol>
    </div>
</template>

<script>
    export default {
        data () {
          return {
              topSitesTitle: 'Top Sites',
              topSites: []
          }
        },
        created() {
            //browser.tabs.query({currentWindow: true}).then(this.logTabs, () => {console.log("error")});
            //TODO make limit configurable
            browser.topSites.get({limit: 5, includeFavicon: true}).then(this.topSitesLoaded);
        },
        methods: {
            logTabs: function (tabs) {
                for (let tab of tabs) {
                    console.log(tab);
                }
            },
            topSitesLoaded: function (sites) {
                this.topSites = this.topSites.concat(sites);
            }
        }




    }
</script>

<style scoped>

</style>