<template>  
  <title>{{title}}</title>
  <router-view/>
</template>

<script>
import { computed, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import { useScreen } from '@/modules/shared/composables/useScreen.js'

export default {
  name: 'App', 
  setup(){
    const store =  useStore()
    const {addScreenListener,removeScreenListener} = useScreen()
   
    addScreenListener();

    onUnmounted(()=>{
         removeScreenListener();
    }); 

    return{
      title: computed(() => store.getters.title)
    }
  }
}
</script>

