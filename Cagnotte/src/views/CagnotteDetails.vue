<template>
  <div>
    <header>
      <h2>{{ cagnotte ? cagnotte.name : 'Chargement…' }}</h2>
      <div>
        <button @click="$router.push(`/cagnottes/${$route.params.id}/edit`)">Modifier</button>
        <button @click="supprimer">Supprimer</button>
        <RouterLink to="/cagnottes">Retour à la liste</RouterLink>
      </div>
      <nav>
        <RouterLink :to="`/cagnottes/${$route.params.id}/infos`">Infos</RouterLink>
        <RouterLink :to="`/cagnottes/${$route.params.id}/donations`">Donations</RouterLink>
      </nav>
    </header>
    <div class="content">
      <RouterView :cagnotte="cagnotte" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CagnotteDetails',
  data() {
    return {
      cagnotte: null
    }
  },
  mounted() {
    this.$api.get(`/cagnottes/${this.$route.params.id}`)
      .then(response => { this.cagnotte = response.data;
      console.log(this.cagnotte)})
      .catch(error => { console.log(error) })
  },
  methods: {
    supprimer() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette cagnotte ?')) {
        this.$api.delete(`/cagnottes/${this.$route.params.id}`)
          .then(() => { this.$router.push('/') })
          .catch(error => { console.log(error) })
      }
    }
  }
}
</script>

<style scoped>
header {
  background: white;
  padding: 20px 24px 0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

header h2 {
  font-size: 1.6rem;
  margin-bottom: 12px;
}

header > div {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

header > div button:last-of-type {
  background: #D32F2F;
}
header > div button:last-of-type:hover {
  background: #b71c1c;
}

nav {
  display: flex;
  gap: 0;
}

nav a {
  padding: 10px 24px;
  font-weight: 600;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}
nav a:hover { color: #1976D2; text-decoration: none; }
nav a.router-link-active {
  color: #1976D2;
  border-bottom: 3px solid #1976D2;
}

.content {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}
</style>

