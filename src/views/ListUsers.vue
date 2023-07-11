<template>
  <div class="card">
    <div class="card-header">
      <h5>Hecho en Vue js</h5>
      <h1 class="mb-4">Buscar Usuarios de GitHub <i class="fas fa-search"></i></h1>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <input v-model="searchText" type="text" class="form-control" placeholder="Ingrese un usuario" @keyup.enter="searchUsers" @input="searchView">
              <div class="input-group-append">
                <button @click="searchUsers" class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlertComponent :error="errorMessage" type="warning"/>
    <div class="card-body" v-if="users.length > 0">
      <h2 class="mt-4">Lista de Usuarios</h2>
      <div class="row">
        <div v-for="user in users" :key="user.id" class="col-md-4 mb-4">
          <a :href="`/user/${user.login}`" target="_blank" class="card-link">
            <div class="card">
              <img :src="user.avatar_url" alt="Avatar" class="card-img-top avatar">
              <div class="card-body">
                <h1 class="card-title"><i class="fa-solid fa-user fa-flip" style="color: #2553a2;"></i> {{ user.login }}</h1>
                <h3 class="card-title"><i class="fa-regular fa-id-card fa-bounce"></i> ID: {{ user.id }}</h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AlertComponent from '../components/utils/AlertComponent';

export default {
  data() {
    return {
      searchText: '',
      users: [],
      errorMessage: '',
    };
  },
  components:{
    AlertComponent,
  },
  methods: {
    searchUsers() {
      this.errorMessage = '';
      this.users = [];
      if (this.searchText.length < 4) {
        this.errorMessage = 'El texto de búsqueda debe tener al menos 4 caracteres.';
        return;
      }

      if (this.searchText.toLowerCase() === 'doublevpartners') {
        this.errorMessage = 'La palabra "doublevpartners" no está permitida.';
        return;
      }

      if(this.errorMessage === ''){
          axios.get(`https://api.github.com/search/users?q=${this.searchText}&per_page=10`)
          .then(response => {
            this.users = response.data.items;
            this.errorMessage = '';
          })
          .catch(error => {
            console.error(error);
            this.errorMessage = 'Error al obtener los usuarios de GitHub.';
          });
      }
    },
    searchView(){
      if(this.searchText.toLowerCase() === ''){
        this.users = [];
      }
    }
  },
};
</script>

<style>
.avatar {
  width: 50px;
  height: 1%;
  object-fit: cover;
}

.card-link {
  text-decoration: none;
}

</style>