<template>
  <div class="card">
    <div class="card-header">
      <h1 class="mb-4">Buscar Usuarios de GitHub</h1>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <input v-model="searchText" type="text" class="form-control" placeholder="Ingrese un usuario">
              <button @click="searchUsers" class="btn btn-primary">Buscar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="error alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="card-body">
      <h2 class="mt-4">Lista de Usuarios</h2>
      <div class="row">
        <div v-for="user in users" :key="user.id" class="col-md-4 mb-4">
          <div class="card">
            <img :src="user.avatar_url" alt="Avatar" class="card-img-top avatar">
            <div class="card-body">
              <h5 class="card-title">{{ user.login }}</h5>
              <router-link :to="`/user/${user.login}`" class="btn btn-primary">Ver perfil</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import axios from 'axios';

export default {
  data() {
    return {
      searchText: '',
      users: [],
      errorMessage: '',
    };
  },
  methods: {
    searchUsers() {
      if (this.searchText.length < 4) {
        this.errorMessage = 'El texto de búsqueda debe tener al menos 4 caracteres.';
        return;
      }

      if (this.searchText.toLowerCase() === 'doublevpartners') {
        this.errorMessage = 'La palabra "doublevpartners" no está permitida.';
        return;
      }

      axios.get(`https://api.github.com/search/users?q=${this.searchText}&per_page=10`)
        .then(response => {
          this.users = response.data.items;
          this.errorMessage = '';
          this.createChart();
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'Error al obtener los usuarios de GitHub.';
        });
    },
    createChart() {
      const followerCounts = this.users.map(user => user.followers);
      new Bar(this.$refs.chart, {
        labels: this.users.map(user => user.login),
        datasets: [
          {
            label: 'Seguidores',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: followerCounts,
          },
        ],
      });
    },
  },
};
</script>

<style>
.avatar {
  width: 50px;
  height: 1%;
  border-radius: 50%;
  object-fit: cover;
}

.error {
  margin-top: 10px;
}

.chart-container {
  position: relative;
  height: 300px;
}
</style>
