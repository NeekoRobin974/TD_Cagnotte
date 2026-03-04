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
      this.$api.post('/cagnottes', {
        name: this.name,
        description : this.description,
        end_date: this.dateToDB(this.end_date),
        goal: this.goal
      }).then(response => {
        console.log(response.data)
      }).catch(error=>{
        console.log(error.response.data)
      })
    }
  }
}

</script>
<template>
  <form @submit.prevent="creer">
    <div>
      <label for="name">Nom</label>
      <input id="name" v-model="name" type="text" required />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <div>
      <label for="end_date">Date de fin</label>
      <input id="end_date" v-model="end_date" type="text" required />
    </div>
    <div>
      <label for="goal">Objectif (€)</label>
      <input id="goal" v-model="goal" type="number" min="1" required />
    </div>
    <button type="submit">Créer</button>
  </form>
  <RouterLink to="/cagnottes">Retourner à l'accueil</RouterLink>
</template>
