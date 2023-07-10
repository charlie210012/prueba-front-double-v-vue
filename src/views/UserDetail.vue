<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <img :src="user.avatar_url" alt="Avatar" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ user.login }}</h5>
            <p class="fw-bold">ID: {{ user.id }}</p>
            <div class="mb-3">
                  <label class="fw-bold">Seguidores:</label>
                  <p class="card-text">{{ user.followers }}</p>
            </div>
            <div class="mb-3">
                  <label class="fw-bold">Creado en:</label>
                  <p class="card-text">{{ formatDate(user.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Información adicional</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-12">
                  <p class="card-text"><label class="fw-bold">Nombre: </label> {{ user.name }}</p>
                </div>
                <div class="mb-12">
                  <p class="card-text"><label class="fw-bold">Ubicación:</label> {{ user.location }}</p>
                </div>
                <div class="mb-12">
                  <p class="card-text"><label class="fw-bold">Correo electrónico:</label> {{ user.email }}</p>
                </div>
                <div class="mb-12">
                  <p class="card-text"><label class="fw-bold">Repositorios públicos:</label> {{ user.public_repos }}</p>
                </div>
                <div class="mb-12">
                  <p class="card-text"><label class="fw-bold">Gists públicos:</label> {{ user.public_gists }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-12">
                <canvas ref="chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Resto del código -->


<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUserDetail();
  },
  methods: {
    getUserDetail() {
      axios.get(`https://api.github.com/users/${this.username}`)
        .then(response => {
          this.user = response.data;
          this.createChart(this.user.followers);
          this.errorMessage = '';
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'Error al obtener los usuarios de GitHub.';
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    createChart(followers) {
      if (this.chartData !== null) {
        const ctx = this.$refs.chart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Seguidores'],
            datasets: [
              {
                label: 'Seguidores',
                data: [followers],
                borderColor: 'blue',
                backgroundColor: 'lightblue',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    },
  },
  created() {
    this.username = this.$route.params.username;
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  align-items: center;
}

.card img {
  height: 300px;
}

.chart-container {
  margin-top: 20px;
}
</style>
