<template>
    <div class="container-fluid">
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
                <template v-for="(tab, index) in displayedTabs">
                    <tr>
                        <td>{{tab.title | trim }}</td>
                        <td>{{tab.lastAccessed | moment}}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-secondary" @click="openTab(tab.url)">Open here</button>
                                <button type="button" class="btn btn-secondary" @click="gotoTab(tab.id)">Go to tab</button>
                                <button type="button" class="btn btn-secondary" @click="closeTab(tab.id, index)">Close</button>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" @click="prevPage" v-if="page > 1">Prev</button>
            <button type="button" class="btn btn-secondary" @click="nextPage" v-if="page < totalPages">Next</button>
        </div>
        <p>Page {{page}} of {{totalPages}} </p>
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
              displayedTabs: [],
              tabCount: 0,
              page: 1,
              totalPages: 1,
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
                this.updatePaging();
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
                this.tabCount--;
                this.updatePaging();
            },
            updatePaging: function () {
                let oldCount = this.totalPages;
                this.totalPages =  Math.ceil(this.tabCount / 20);
                if (this.totalPages < oldCount){
                    this.page--;
                }
                this.displayedTabs = this.openTabs.slice((this.page -1)*20, this.page * 20);
            },
            prevPage: function () {
                if (this.page > 1 && this.page < this.totalPages){
                    this.page--;
                    this.updatePaging();
                }
            },
            nextPage: function () {
                if (this.page < this.totalPages) {
                    this.page++;
                    this.updatePaging();
                }
            }
        },
        filters:{
            moment: function(date){
                return moment(date).fromNow();
            },
            trim: function (str) {
                return str.length > 80 ? str.substring(0,80) + "..." : str;
            }
        }




    }
</script>

<style scoped>

</style>