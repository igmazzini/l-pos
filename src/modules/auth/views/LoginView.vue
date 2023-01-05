<template>
  <section class="login">
    <div class="card login-card">
      <img src="../assets/img/end2end_logo.png" class="login-img" alt="Logo" />

      <form>
        <label for="inputName" class="form-label">{{ t('loginName') }}</label>
        <input type="text" :class="['form-control', 'login-input',(emptyName) ? 'empty-input' : '']" id="inputName"  v-model="userName" required />
        <p :class="['empty-field',(emptyName) ? 'show-empty' : '']"> {{ t('loginName') }} {{ t('loginError') }} </p>
       
        <label for="inputPassword" class="form-label mt-3">{{ t('loginPassword') }}</label>
        <div class="password-row">
           <input
          :type="(!showPassword) ? 'password' : 'text'"
          :class="['form-control', 'login-input', (emptyPassword) ? 'empty-input' : '']"
          id="inputPassword"
          required
          v-model="password"
        />
        <span v-if="showPassword" class="show-password" @click="showPassword = false">
           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
        </span>
        <span v-if="!showPassword" class="hide-password" @click="showPassword = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        </span>
        </div>
       
        <p :class="['empty-field',(emptyPassword) ? 'show-empty' : '']" > {{ t('loginPassword') }} {{ t('loginError') }} </p>

       
      </form>
      <div class="login-buttons">
        <span  :class="['login-error',(loginError != '') ? 'show-empty' : '']">{{ loginError }}</span>
      
        <button @click="onLogin" class="btn btn-primary login-button">
          {{ t('loginButton') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuth } from '@/modules/auth/composables/useAuth';
import { useUI } from '@/modules/shared/composables';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, watchEffect } from 'vue';


export default {
  name: "Login",
  setup() {

    const { t } = useI18n();
    const { setTitle }  = useUI();
    const { login, isAuthenticated, logout }  = useAuth();
    const router = useRouter();
    const userName = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loginError = ref('');
    const emptyName = ref(false);
    const emptyPassword = ref(false);
    const firstTimeCheck = ref(true);


    setTitle(t('loginTitle'));

    watchEffect( ()=>{

        if(!firstTimeCheck.value){

           if(userName.value == ''){
              emptyName.value = true;
            }else{
              emptyName.value = false;
            }

            if(password.value == ''){
              emptyPassword.value = true;
            }else{
              emptyPassword.value = false;
            }

        }
       
    });


    logout();


    const onLogin = async () => {
      

      if(userName.value != '' && password.value != ''){      

        await login(userName.value, password.value);    

        if(isAuthenticated.value){

          loginError.value = '';
        
          router.push({name:'selector'});

        }else{

          loginError.value = t('invalidCredentials');
        }

      }else{


         if(userName.value == ''){
            emptyName.value = true;
         }
         if(password.value == ''){
            emptyPassword.value = true;
         }

         firstTimeCheck.value = false;
      }

     
    }

    return {
      t,
      router, 
      userName,
      password,   
      loginError, 
      onLogin,     
      showPassword,
      emptyName,
      emptyPassword

     
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>