<template>
  <div class="donation-item">
    <div class="donation-header">
      <span class="donation-date" v-db-date-hour="donation.date"></span>
      <div class="actions">
        <button @click="$emit('edit', donation)" title="Modifier" class="btn-icon">✏️</button>
        <button @click="suppDon" title="Supprimer" class="btn-icon">❌</button>
      </div>
    </div>

    <div class="donation-content">
      <span class="donor-info">
        <strong>{{ donation.donator || 'Anonyme' }}</strong> a donné
        <span class="amount">{{ formatAmount(donation.amount) }}</span>
      </span>
      <p v-if="donation.comment" class="comment">
        {{ cutText(donation.comment) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donation',
  props: {
    donation: {
      type: Object,
      required: true
    },
    cagnotteId: {
       type: [String, Number],
       required: true
    }
  },
  emits: ['edit', 'deleted'],
  methods: {
    suppDon() {
      if(confirm('Êtes-vous sûr de vouloir supprimer cette donation ?')) {
        this.$api.delete(`/cagnottes/${this.cagnotteId}/donations/${this.donation.id}`)
          .then(() => {
             this.$emit('deleted', this.donation.id);
          })
          .catch(err => {
             console.error('Erreur suppression donation', err);
             alert('Erreur lors de la suppression');
          });
      }
    }
  }
}
</script>

<style scoped>
.donation-item {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.donation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.85em;
  color: #7f8c8d;
}

.donation-content {
  display: flex;
  flex-direction: column;
}

.donor-info strong {
    color: #2c3e50;
}

.amount {
  font-weight: bold;
  color: #27ae60;
  margin-left: 4px;
}

.comment {
  font-style: italic;
  color: #666;
  font-size: 0.9em;
  margin: 4px 0 0 0;
  padding-left: 8px;
  border-left: 2px solid #eee;
}

.actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  opacity: 0.6;
  transition: opacity 0.2s;
  font-size: 1rem;
}

.btn-icon:hover {
  opacity: 1;
}
</style>
