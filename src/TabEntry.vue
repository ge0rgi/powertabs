<template>
<tr>
    <td>{{tab.title}}</td>
    <td>{{tab.lastAccessed | moment}}</td>
</tr>
</template>

<script>
    export default {
        name: "TabEntry",
        props: ["tab"],
        filters:{
            moment: function(date){
                return moment(date).fromNow();
            }
        },
    }
</script>

<style scoped>

</style>