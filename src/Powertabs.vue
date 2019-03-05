<template>
    <div class="container">
        <h4>{{topSitesTitle}}</h4>
        <ol>
           <li v-for="site in topSites">
               <a v-bind:href="site.url">{{site.url}}</a>
           </li>
        </ol>
        <h4>{{tabCountTitle}} {{tabCount}}</h4>
    </div>
</template>

<script>
    export default {
        data () {
          return {
              topSitesTitle: 'Top Sites',
              tabCountTitle: "Tab Count",
              topSites: [],
              openTabs: [],
              tabCount: 0
          }
        },
        created() {
            browser.tabs.query({currentWindow: true}).then(this.tabsLoaded);
            //TODO make limit configurable
            browser.topSites.get({limit: 5, includeFavicon: true}).then(this.topSitesLoaded);
        },
        methods: {
            tabsLoaded: function (tabs) {
                this.openTabs = this.openTabs.concat(tabs);
                this.tabCount = this.openTabs.length;
            },
            topSitesLoaded: function (sites) {
                this.topSites = this.topSites.concat(sites);
            }
        }




    }
</script>

<style scoped>

</style>