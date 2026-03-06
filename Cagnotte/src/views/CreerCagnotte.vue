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
        this.$router.push('/');
        console.log(response.data);
      }).catch(error=>{
        console.log(error.response.data)
      })
    }
  }
}

</script>
<template>
  <div class="form-wrapper">
    <form @submit.prevent="creer">
    <div>
      <label for="name">Nom</label>
      <input id="name" v-model="name" type="text" required v-focus/>
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
  <RouterLink to="/cagnottes">← Retourner à l'accueil</RouterLink>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 520px;
  margin: 40px auto;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

a {
  display: inline-block;
  margin-top: 16px;
  font-size: 0.9rem;
}
</style>

