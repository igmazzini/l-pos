<template>
  <Navbar/>
  <router-view/>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name:'Lottery',
    components:{
       Navbar:defineAsyncComponent( ()=> import('../../shared/components/Navbar.vue'))       
    }

}
</script>

