<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"> Events App </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/today" active-class="active">
              Today
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upcoming" active-class="active">
              Upcoming
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/categories"
              active-class="active"
            >
              Categories
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLogged">
            <router-link class="nav-link" to="/register" active-class="active">
              Register
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLogged">
            <router-link class="nav-link" to="/login" active-class="active">
              Login
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link
              class="nav-link"
              to="/createevent"
              active-class="active"
            >
              Create Event
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="nav-link" to="/profile" active-class="active">
              Profile
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged && isAdmin">
            <router-link class="nav-link" to="/users" active-class="active">
              Users
            </router-link>
          </li>
          <li class="nav-item" v-if="isLogged">
            <a class="nav-link" @click="logout()"> Logout </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import auth from "./common/auth";
import { getStore } from "./common/store";

export default {
  data() {
    return {
      store: getStore(),
    };
  },
  computed: {
    isLogged() {
      // console.log(this.store.state.user, 'INFO DEL USUARIO')
      return this.store.state.user.logged;
    },
    isAdmin() {
      return this.store.state.user.authority === "ADMIN";
    },
  },
  methods: {
    logout() {
      auth.logout();
      // Despu??s de hacer logout nos vamos a home
      if (this.$router.currentRoute.name != "home") {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

/* fixing popper warning in bootstrap 5.2: */
.dropdown-menu {
  margin-top: 0px !important;
}
</style>
