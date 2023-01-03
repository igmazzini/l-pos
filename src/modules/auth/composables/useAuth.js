import { computed } from "vue";
import { useStore } from "vuex";

export const useAuth = () => {

    const store = useStore();
  

    const isAuthenticated = computed( () =>   store.getters['authStore/isAuthenticated']);


    const login = async (user, pass) =>{       

        let authorized = false;

        if(user == 'demo' && pass == 'demoE2E'){
            authorized = true;
        }        

        store.commit('authStore/setIsAuthenticated', authorized);


        localStorage.setItem('authorized',authorized);

        return isAuthenticated;
       
    }

    const logout = () =>{

        localStorage.removeItem('authorized');

        store.commit('authStore/setIsAuthenticated', false);
       
    }


    return{
        isAuthenticated,
        login,
        logout

    }

}