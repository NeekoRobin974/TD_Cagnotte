<template>
  <div class="donations-view">
    <div class="donation-form-container">
      <h3>Faire une donation</h3>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="submitDonation" class="donation-form">
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

        <button type="submit" :disabled="loading">Je participe !</button>
      </form>
    </div>

    <div class="donations-list-container">
      <h3>Dernières donations</h3>
      <ul v-if="donations.length > 0" class="donations-list">
        <li v-for="donation in donations" :key="donation.id" class="donation-item">
          <span class="donation-info">
            <strong>{{ donation.donator || 'Anonyme' }}</strong> a donné
            <span class="amount">{{ formatAmount(donation.amount) }}</span>
          </span>
          <span class="donation-date">{{ dbDateHourToFr(donation.date) }}</span>
        </li>
      </ul>
      <p v-else>Soyez le premier à participer !</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donations',
  data() {
    return {
      donations: [],
      form: {
        amount: null,
        donator: ''
      },
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

    submitDonation() {
      this.error = null;
      this.loading = true;

      this.$api.post(`/cagnottes/${this.cagnotteId}/donations`, {
        amount: this.form.amount,
        donator: this.form.donator
      })
      .then(response => {
        //Don en tête de liste
        this.donations.unshift(response.data);

        //Reset from
        this.form.amount = null;
        this.form.donator = '';

        this.$nextTick(() => {
          this.$refs.amountInput.focus();
        });
      })
      .catch(err => {
        console.error("Erreur lors de la donation", err);
        this.error = "Une erreur est survenue lors de l'enregistrement de votre donation.";
        if (err.response && err.response.data && err.response.data.message) {
           this.error = err.response.data.message;
        }
      })
      .finally(() => {
        this.loading = false;
      });
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
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: #d32f2f;
  background-color: #fdecea;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.donations-list {
  list-style: none;
  padding: 0;
}

.donation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.amount {
  font-weight: bold;
  color: #27ae60;
}

.donation-date {
  font-size: 0.85em;
  color: #7f8c8d;
}
</style>
