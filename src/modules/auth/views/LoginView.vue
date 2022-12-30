<template>
  <section class="login">
    <div class="card login-card">
      <img src="../assets/img/end2end_logo.png" class="login-img" alt="Logo" />

      <form>
        <label for="inputName" class="form-label">{{ t('loginName') }}</label>
        <input type="text" class="form-control login-input" id="inputName" required />
        <div class="invalid-feedback">
          {{ t('loginName') }}{{ t('loginError') }}
        </div>
        <label for="inputPassword" class="form-label mt-3">{{ t('loginPassword') }}</label>
        <input
          type="password"
          class="form-control login-input"
          id="inputPassword"
          required
        />
        <div class="invalid-feedback">{{ t('loginPassword') }}{{ t('loginError') }}</div>
      </form>
      <div class="login-buttons">
        <span class="login-error">{{ t('invalidCredentials') }}</span>
      
        <button @click="test" class="btn btn-primary login-button">
          {{ t('loginButton') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


export default {
  name: "Login",
  setup() {

    const { t } = useI18n();
    const store  = useStore();
    const router = useRouter();
    store.commit('setTitle','Inicio de sesión');

    return {
      t,
      router,     
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