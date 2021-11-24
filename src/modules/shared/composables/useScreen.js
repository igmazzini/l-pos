import { useStore } from 'vuex';

export const useScreen = () => {
   
   
    const store =  useStore()
    const mql = window.matchMedia('(max-width: 1300px)');
    if (window.matchMedia("(max-width: 1300px)").matches) {        
      store.commit('setMobile',true);
    }else{       
      store.commit('setMobile',false);
    }

    const screenSize = (e) => {
     
      if (e.matches) {        
        store.commit('setMobile',true);
      } else {        
        store.commit('setMobile',false);
      }
      
    }
   

    const addScreenListener = () => {
        mql.addEventListener('change', screenSize);
    }
    const removeScreenListener = () => {
        mql.removeEventListener('change', screenSize);
    }
   

    return{
      addScreenListener,
      removeScreenListener     
    }
}