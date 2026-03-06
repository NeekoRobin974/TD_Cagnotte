<template>
  <div v-if="cagnotte">
    <p><strong>Description :</strong> {{ cagnotte.description }}</p>
    <p><strong>Date limite :</strong> {{ dbDateToFr(cagnotte.end_date) }} ({{ joursRestants }} jours restants)</p>
    <p><strong>Objectif :</strong> {{ formatAmount(cagnotte.goal) }}</p>
    <p><strong>Montant récolté :</strong> {{ formatAmount(cagnotte._achieved) }}</p>
    <p><strong>Montant restant :</strong> {{ formatAmount(cagnotte.goal - cagnotte._achieved) }}</p>
    <p><strong>% atteint :</strong> {{ pourcentage }}%</p>
    <p><strong>Nombre de donations :</strong> {{ cagnotte._nb_donations }}</p>
    <p><strong>Montant moyen des donations :</strong> {{ formatAmount(moyenneDonations) }}</p>
  </div>
  <div v-else>
    <p>Chargement…</p>
  </div>
</template>

<script>
export default {
  name: 'CagnotteInfos',
  props: {
    cagnotte: {
      type: Object,
      default: null
    }
  },
  computed: {
    joursRestants() {
      if (!this.cagnotte) return 0
      const fin = new Date(this.cagnotte.end_date)
      const aujourd_hui = new Date()
      const diff = fin - aujourd_hui
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    },
    pourcentage() {
      if (!this.cagnotte || !this.cagnotte.goal) return 0
      return Math.min(100, Math.round((this.cagnotte._achieved / this.cagnotte.goal) * 100))
    },
    moyenneDonations() {
      if (!this.cagnotte || !this.cagnotte._nb_donations || this.cagnotte._nb_donations === 0) return 0
      return this.cagnotte._achieved / this.cagnotte._nb_donations
    }
  }
}
</script>

<style scoped>
div {
  background: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

p {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
}
p:last-child { border-bottom: none; }

strong { color: #555; margin-right: 8px; }
</style>

