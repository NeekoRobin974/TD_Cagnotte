<template>
  <div class="form-wrapper">
    <form @submit.prevent="modifier">
    <h2>Modifier la cagnotte</h2>

    <div v-if="erreurs" style="color: red;">
      <p v-for="(msg, champ) in erreurs" :key="champ">{{ champ }} : {{ msg }}</p>
    </div>

    <div>
      <label for="name">Nom</label>
      <input id="name" v-model="name" type="text" required v-focus />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <div>
      <label for="end_date">Date de fin (DD/MM/YYYY)</label>
      <input id="end_date" v-model="end_date" type="text" required />
    </div>
    <div>
      <label for="goal">Objectif (€)</label>
      <input id="goal" v-model="goal" type="number" min="1" required />
    </div>

    <button type="submit">Enregistrer</button>
    <RouterLink :to="`/cagnottes/${$route.params.id}`">Annuler</RouterLink>
  </form>
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
  margin-left: 12px;
  font-size: 0.9rem;
}
</style>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      end_date: '',
      goal: 1,
      erreurs: null
    }
  },
  mounted() {
    this.$api.get(`/cagnottes/${this.$route.params.id}`)
      .then(response => {
        const c = { ...response.data }
        this.name = c.name
        this.description = c.description
        this.end_date = this.dbDateToFr(c.end_date)
        this.goal = c.goal
      })
      .catch(error => { console.log(error) })
  },
  methods: {
    modifier() {
      this.$api.put(`/cagnottes/${this.$route.params.id}`, {
        name: this.name,
        description: this.description,
        end_date: this.dateToDB(this.end_date),
        goal: this.goal
      })
        .then(() => {
          this.$router.push(`/cagnottes/${this.$route.params.id}`)
        })
        .catch(error => {
          this.erreurs = error.response?.data
          console.log(error.response?.data)
        })
    }
  }
}
</script>
