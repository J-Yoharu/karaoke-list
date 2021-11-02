<template>
<div >
    <p class="display-1">Atualizações</p>
    <p>As novas atualializações, são referente aos pacotes 36B até 36N, contendo ao total, {{db.length}} músicas</p>
  <List :searchable="false" :db="db" :loadingAllDb="true"/>
</div>
</template>

<script>
export default {
    data(){
        return {
            db: [],
        }
    },
    created(){
        let db = JSON.parse(localStorage.dbKaraoke)
        this.db = db.slice(db.length - 120, db.length);
    },
    components:{
        List: () => import("@/components/List.vue")
    }
}
</script>

<style>

</style>