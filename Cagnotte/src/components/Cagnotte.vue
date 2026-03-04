<script>
export default {
  name: 'CagnotteCard',
  props: {
    cagnotte: {
      type: Object,
      required: true,
    },
  },
  computed: {
    progression() {
      if (!this.cagnotte.goal || this.cagnotte.goal === 0) return 0
      const pct = ((this.cagnotte.collected || 0) / this.cagnotte.goal) * 100
      return Math.min(Math.round(pct), 100)
    },

    joursRestants() {
      if (!this.cagnotte.end_date) return null
      const fin = new Date(this.cagnotte.end_date.split('T')[0])
      const aujourd_hui = new Date()
      aujourd_hui.setHours(0, 0, 0, 0)
      const diff = fin - aujourd_hui
      return Math.ceil(diff / (1000 * 60 * 60 * 24))
    },

    couleurUrgence() {
      const j = this.joursRestants
      if (j === null) return 'urgence-bleu'
      if (j > 30)  return 'urgence-bleu'
      if (j >= 5)  return 'urgence-orange'
      return 'urgence-rouge'
    },
  },
}
</script>

<template>
  <div class="cagnotte-card" :class="couleurUrgence">
    <h3>{{ cagnotte.name }}</h3>

    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progression + '%' }"></div>
    </div>
    <p class="progression-label">{{ progression }}% de {{ formatAmount(cagnotte.goal) }}</p>

    <p class="date-fin">{{ dbDateToFr(cagnotte.end_date) }}
      <span v-if="joursRestants !== null">({{ joursRestants }} jour{{ joursRestants > 1 ? 's' : '' }})</span>
    </p>

    <p class="description">{{ cutText(cagnotte.description) }}</p>
  </div>
</template>

<style scoped>
.cagnotte-card {
  border-radius: 10px;
  padding: 16px;
  margin: 10px;
  color: white;
  min-width: 250px;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.urgence-bleu   { background-color: #1976D2; }
.urgence-orange { background-color: #F57C00; }
.urgence-rouge  { background-color: #D32F2F; }

h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.progress-bar-container {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar {
  height: 100%;
  background-color: white;
  border-radius: 10px;
  transition: width 0.4s ease;
}

.progression-label {
  font-size: 0.85rem;
  margin: 0 0 8px 0;
  opacity: 0.9;
}

.date-fin {
  font-size: 0.9rem;
  margin: 4px 0;
}

.description {
  font-size: 0.85rem;
  opacity: 0.85;
  margin: 4px 0 0 0;
  font-style: italic;
}
</style>

