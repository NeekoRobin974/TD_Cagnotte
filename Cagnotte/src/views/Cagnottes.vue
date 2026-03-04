<template>
  <div>
    <h2>Liste des cagnottes</h2>
    <RouterLink id="creation-cagnotte" to="/cagnottes/new">Créer une nouvelle cagnotte</RouterLink>

    <div class="cagnottes-container">
      <Cagnotte
        v-for="cagnotte in cagnottesActives"
        :key="cagnotte.id"
        :cagnotte="cagnotte"
        class="cagnotte-item"
        @click="$router.push('/cagnottes/' + cagnotte.id)"
      ></Cagnotte>
    </div>

    <div v-if="cagnottesActives.length === 0 && cagnottes.length > 0">
      <p>Aucune cagnotte active.</p>
    </div>

    <a href="#" @click.prevent="montrerFinies = !montrerFinies" class="toggle-finished">
      {{ montrerFinies ? 'Masquer' : 'Voir' }} les cagnottes terminées
    </a>

    <div v-if="montrerFinies" class="cagnottes-container">
      <Cagnotte
        v-for="cagnotte in cagnottesFinies"
        :key="cagnotte.id"
        :cagnotte="cagnotte"
        class="cagnotte-item finished"
        @click="$router.push('/cagnottes/' + cagnotte.id)"
      ></Cagnotte>
    </div>
  </div>
</template>

<script>
import Cagnotte from '@/components/Cagnotte.vue'

export default {
  components: {
    Cagnotte
  },
  data() {
    return {
      cagnottes: [],
      montrerFinies: false
    };
  },
  computed: {
    cagnottesActives() {
      const ajd = new Date();
      ajd.setHours(0, 0, 0, 0);
      return this.cagnottes
        .filter(c => new Date(c.end_date) >= ajd)
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
    },
    cagnottesFinies() {
      const ajd = new Date();
      ajd.setHours(0, 0, 0, 0);
      return this.cagnottes
        .filter(c => new Date(c.end_date) < ajd)
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
    }
  },
  mounted() {
    this.$api.get('/cagnottes')
      .then(response => {
        this.cagnottes = response.data;
      })
      .catch(error => {
        console.error("Erreur de chargement", error);
      });
  }
}
</script>

<style scoped>
.cagnottes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.cagnotte-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.cagnotte-item:hover {
  transform: scale(1.02);
}

.cagnotte-item.finished {
  filter: grayscale(100%);
  opacity: 0.7;
}

.toggle-finished {
  display: block;
  margin: 20px 0;
  color: #007bff;
  text-decoration: none;
}

.toggle-finished:hover {
  text-decoration: underline;
}
</style>
