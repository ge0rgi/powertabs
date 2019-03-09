<template>
    <div class="container-fluid">
        <h4>{{topSitesTitle}}</h4>
        <ol>
           <li v-for="site in topSites">
               <a v-bind:href="site.url">{{site.url}}</a>
           </li>
        </ol>
        <h4>{{tabCountTitle}} {{tabCount}}</h4>
        <h4 v-if="tabCount !== filteredTabCount">Search result count {{filteredTabCount}}</h4>
        <input class="form-control form-control-lg" type="text" placeholder="Filter" v-model="filter">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Title</th>
                <th @click="changeSortOrder">Last Visited <i v-if="sortAsc" class="fas fa-sort-alpha-up"></i> <i v-if="!sortAsc" class="fas fa-sort-alpha-down"></i> </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <template v-for="tab in displayedTabs">
                    <tr>
                        <td>{{tab.title | trim }}</td>
                        <td>{{tab.lastAccessed | moment}}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-secondary" @click="openTab(tab.url)">Open here</button>
                                <button type="button" class="btn btn-secondary" @click="gotoTab(tab.id)">Go to tab</button>
                                <button type="button" class="btn btn-secondary" @click="closeTab(tab.id)">Close</button>
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
              tabCountTitle: 'Tab Count',
              topSites: [],
              openTabs: [],
              filteredTabs: [],
              page: 1,
              filter: '',
              sortAsc: true
          }
        },
        created () {
            browser.tabs.query({ currentWindow: true }).then(this.tabsLoaded);
            // TODO make limit configurable
            browser.topSites.get({ limit: 5, includeFavicon: true }).then(this.topSitesLoaded)
        },
        methods: {
            tabsLoaded: function (tabs) {
                this.openTabs = tabs.sort(this.sortTabs);
                this.updateFiltering();
            },
            sortTabs: function (a, b) {
                if (a.lastAccessed > b.lastAccessed) {
                    return -1
                }
                if (a.lastAccessed < b.lastAccessed) {
                    return 1
                }
                return 0
            },
            topSitesLoaded: function (sites) {
                this.topSites = this.topSites.concat(sites)
            },
            openTab: function (url) {
                browser.tabs.getCurrent().then(tab => browser.tabs.update(tab.id, { url: url }))
            },
            gotoTab: function (id) {
                browser.tabs.getCurrent().then(tab => browser.tabs.update(id, { active: true })
                    .then(this.closeTab(tab.id)))
            },
            closeTab: function (id) {
                browser.tabs.remove(id);
                browser.tabs.query({ currentWindow: true }).then(this.tabsLoaded);
            },
            prevPage: function () {
                if (this.page > 1) {
                    this.page--
                }
            },
            nextPage: function () {
                if (this.page < this.totalPages) {
                    this.page++
                }
            },
            changeSortOrder: function () {
                this.sortAsc = !this.sortAsc
            },
            updateFiltering: function () {
                if (this.filter.trim().length > 0) {
                    this.filteredTabs = this.openTabs.filter(el => el.title.toLowerCase().includes(this.filter.trim().toLowerCase()))
                } else {
                    this.filteredTabs = this.openTabs
                }
            }
        },
        filters: {
            moment: function (date) {
                return moment(date).fromNow()
            },
            trim: function (str) {
                return str.length > 80 ? str.substring(0, 80) + '...' : str
            }
        },
        computed: {
            tabCount: function () {
                return this.openTabs.length
            },
            filteredTabCount: function () {
                return this.filteredTabs.length
            },
            totalPages: function () {
                return Math.ceil(this.filteredTabCount / 20)
            },
            displayedTabs: function () {
                return this.filteredTabs.slice((this.page - 1) * 20, this.page * 20)
            }
        },
        watch: {
            filter: function (value) {
                this.filteredTabs = this.openTabs.filter(el => el.title.toLowerCase().includes(value.trim().toLowerCase()))
            },
            sortAsc: function () {
                this.openTabs.reverse();
                this.updateFiltering();

            }
        }
    }
</script>

<style scoped>

</style>
