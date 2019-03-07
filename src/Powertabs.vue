<template>
    <div class="container">
        <h4>{{topSitesTitle}}</h4>
        <ol>
           <li v-for="site in topSites">
               <a v-bind:href="site.url">{{site.url}}</a>
           </li>
        </ol>
        <h4>{{tabCountTitle}} {{tabCount}}</h4>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>Title</th>
                <th>Last Visited</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <template v-for="(tab, index) in openTabs">
                    <tr>
                        <td>{{tab.title}}</td>
                        <td>{{tab.lastAccessed | moment}}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary" @click="openTab(tab.url)">Open here</button>
                                <button type="button" class="btn btn-secondary" @click="gotoTab(tab.id)">Go to tab</button>
                                <button type="button" class="btn btn-secondary" @click="closeTab(tab.id, index)">Close</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
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
            },
            openTab: function (url) {
                browser.tabs.getCurrent().then(tab => browser.tabs.update(tab.id, {url: url}));
            },
            gotoTab: function (id) {
                browser.tabs.getCurrent().then(tab => browser.tabs.update(id, {active: true})
                    .then(this.closeTab(tab.id)));
            },
            closeTab: function (id, index) {
                browser.tabs.remove(id);
                this.openTabs.splice(index, 1);
            }
        },
        filters:{
            moment: function(date){
                return moment(date).fromNow();
            }
        }




    }
</script>

<style scoped>

</style>