<template>
    <div>
        <h1>{{name}}</h1>
        <button>Test</button>
    </div>
</template>

<script>
    export default {
        data () {
          return {
              name: 'Powertabs'
          }
        },
        created() {
            browser.tabs.query({currentWindow: true}).then(this.logTabs, () => {console.log("error")});
        },
        methods: {
            logTabs: function (tabs) {
                for (let tab of tabs){
                    console.log(tab);
                }
            }
        }




    }
</script>

<style scoped>

</style>