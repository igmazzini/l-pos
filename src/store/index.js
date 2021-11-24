import { createStore } from 'vuex'
import authStore from '../modules/auth/store'
import lotteryStore from '../modules/lottery/store'

const store = createStore({

    state:{
        version:1.3,
        title:'Loteria',
        mobile:false,
        isLoading:false
    },
    mutations:{
        setLoading(state,loading){
            state.isLoading = loading;
        },
        setTitle(state,title){
            state.title = title;
        },
        setMobile(state,mobile){
            state.mobile = mobile;
        }
    },
    modules:{
        authStore,
        lotteryStore
    },
    getters:{
        title(state){
            return state.title
        },
        mobile(state){
            return state.mobile
        }
    }
    

})


export default store