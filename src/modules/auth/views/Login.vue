<template>
  <section class="login">
    <div class="card login-card">
      <img src="../assets/img/end2end_logo.png" class="login-img" alt="Logo" />

      <form>
        <label for="inputName" class="form-label">{{ lblUserName }}</label>
        <input type="text" class="form-control login-input" id="inputName" required />
        <div class="invalid-feedback">
          El nombre de usuario no puede estar vacio.
        </div>
        <label for="inputPassword" class="form-label mt-3">{{
          lblPassword
        }}</label>
        <input
          type="password"
          class="form-control login-input"
          id="inputPassword"
          required
        />
        <div class="invalid-feedback">La contraseña no puede estar vacia.</div>
      </form>
      <div class="login-buttons">
        <span class="login-error">{{ loginError }}</span>
      
        <button @click="test" class="btn btn-primary login-button">
          {{ lblSubmit }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from 'vue-router';


export default {
  name: "Login",
  setup() {

    const store  = useStore();
    const router = useRouter();
    store.commit('setTitle','Inicio de sesión');

    return {
      router,
      lblUserName: "Nombre de usuario",
      lblPassword: "Contraseña",
      lblSubmit: "Ingresar",
      loginError: "Credenciales invalidas",
      test() {
        document.querySelector("form").classList.add("was-validated");
        router.push({name:'selector'})

      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>