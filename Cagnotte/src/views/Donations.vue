<template>
  <div class="donations-view">
    <div class="donation-form-container">
      <h3>{{ isEditing ? 'Modifier la donation' : 'Faire une donation' }}</h3>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="envoyerDon" class="donation-form">
        <div class="form-group">
          <label for="amount">Montant (€)</label>
          <input
            id="amount"
            ref="amountInput"
            type="number"
            v-model.number="form.amount"
            min="1"
            step="0.01"
            required
            v-focus
          >
        </div>

        <div class="form-group">
          <label for="donator">Nom du participant</label>
          <input
            id="donator"
            type="text"
            v-model="form.donator"
            required
          >
        </div>

        <div class="form-group">
          <label for="comment">Commentaire (optionnel)</label>
          <textarea
            id="comment"
            v-model="form.comment"
            rows="2"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="loading">
            {{ isEditing ? 'Enregistrer' : 'Faire un don' }}
          </button>
          <button v-if="isEditing" type="button" @click="annulerModif" class="btn-cancel">
            Annuler
          </button>
        </div>
      </form>
    </div>

    <div class="donations-list-container">
      <h3>Dernières donations</h3>
      <ul v-if="donations.length > 0" class="donations-list">
        <li v-for="donation in donations" :key="donation.id">
          <Donation
            :donation="donation"
            :cagnotte-id="cagnotteId"
            @edit="modifierDon"
            @deleted="suppDon"
          />
        </li>
      </ul>
      <p v-else>Soyez le premier à faire un don !</p>
    </div>
  </div>
</template>

<script>
import Donation from '@/components/Donation.vue'

export default {
  name: 'Donations',
  components: {
    Donation
  },
  data() {
    return {
      donations: [],
      form: {
        amount: null,
        donator: '',
        comment: ''
      },
      isEditing: false,
      editingId: null,
      loading: false,
      error: null
    }
  },

  computed: {
    cagnotteId() {
      return this.$route.params.id;
    }
  },

  mounted() {
    this.fetchDonations();
  },

  methods: {
    fetchDonations() {
      this.$api.get(`/cagnottes/${this.cagnotteId}/donations`)
        .then(response => {
          this.donations = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        })
        .catch(error => {
          console.error("Erreur lors du chargement des donations", error);
        });
    },

    modifierDon(donation) {
      this.isEditing = true;
      this.editingId = donation.id;
      this.form.amount = donation.amount;
      this.form.donator = donation.donator;
      this.form.comment = donation.comment || '';
      this.$nextTick(() => {
        this.$refs.amountInput.focus();
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    annulerModif() {
      this.isEditing = false;
      this.editingId = null;
      this.resetForm();
    },

    resetForm() {
      this.form.amount = null;
      this.form.donator = '';
      this.form.comment = '';
    },

    suppDon(id) {
      this.donations = this.donations.filter(d => d.id !== id);
      if (this.editingId === id) {
        this.annulerModif();
      }
    },

    envoyerDon() {
      this.error = null;
      this.loading = true;

      const payload = {
        amount: this.form.amount,
        donator: this.form.donator,
        comment: this.form.comment
      };

      if (this.isEditing) {
        this.$api.put(`/cagnottes/${this.cagnotteId}/donations/${this.editingId}`, payload)
          .then(response => {
            // Mettre à jour la donation dans la liste
            const index = this.donations.findIndex(d => d.id === this.editingId);
            if (index !== -1) {
              this.donations[index] = response.data;
            }
            this.annulerModif();
          })
          .catch(this.handleError)
          .finally(() => { this.loading = false; });
      } else {
        this.$api.post(`/cagnottes/${this.cagnotteId}/donations`, payload)
          .then(response => {
            this.donations.unshift(response.data);
            this.resetForm();
            this.$nextTick(() => {
              this.$refs.amountInput.focus();
            });
          })
          .catch(this.handleError)
          .finally(() => { this.loading = false; });
      }
    },

    handleError(err) {
      console.error("Erreur lors de l'opération", err);
      this.error = "Une erreur est survenue.";
      if (err.response && err.response.data && err.response.data.message) {
         this.error = err.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.donations-view {
  margin-top: 20px;
}

.donation-form-container {
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  border-color: #3498db;
  outline: none;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #34495e;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #e74c3c;
}

.btn-cancel:hover {
  background-color: #c0392b;
}

.error-message {
  color: #c0392b;
  background-color: #fadbd8;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid #c0392b;
}

.donations-list {
  list-style: none;
  padding: 0;
}
</style>
