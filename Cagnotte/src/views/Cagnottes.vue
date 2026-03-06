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
        .filter(c => {
          const parts = c.end_date.split('T')[0].split('-');
          const fin = new Date(parts[0], parts[1] - 1, parts[2]);
          return fin > ajd;
        })
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
    },
    cagnottesFinies() {
      const ajd = new Date();
      ajd.setHours(0, 0, 0, 0);
      return this.cagnottes
        .filter(c => {
          const parts = c.end_date.split('T')[0].split('-');
          const fin = new Date(parts[0], parts[1] - 1, parts[2]);
          return fin <= ajd;
        })
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
div {
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

h2 {
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #222;
}

h3 {
  margin: 28px 0 14px;
  font-size: 1.1rem;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

#creation-cagnotte {
  display: inline-block;
  margin-bottom: 24px;
  padding: 10px 20px;
  background: #1976D2;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s;
}
#creation-cagnotte:hover {
  background: #1256a0;
  text-decoration: none;
}

.cagnottes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cagnotte-item {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.cagnotte-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.cagnotte-item.finished {
  filter: grayscale(80%);
  opacity: 0.65;
}

.toggle-finished {
  display: inline-block;
  margin: 24px 0 12px;
  font-weight: 600;
  color: #1976D2;
}
</style>
