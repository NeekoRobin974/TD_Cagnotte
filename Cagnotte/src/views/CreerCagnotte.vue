<script>
export default{
  data(){
    return {
      name: '',
      description: '',
      end_date: (new Intl.DateTimeFormat('fr-FR')).format(new Date()),
      goal: 1,
    }
  },
  methods:{
    creer(){
      this.api.post('api/cagnottes', {
        name: this.nom,
        description : this.description,
        end_date: this.dateToDB(this.end_date),
        goal: this.goal
      })
    }
  }
}

</script>
<template>
  <form>
  </form>
</template>
