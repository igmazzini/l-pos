import { createStore } from 'vuex'
import authStore from '../modules/auth/store'
import lotteryStore from '../modules/lottery/store'

const store = createStore({

    state:{
        version:'V 1.3',
        title:'Loteria',
        currency:'₡',
        mobile:false,
        isLoading:false,
        language:'ENG_US',
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
        },
        setLanguage(state,language){
            state.language = language;
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
        },
        currency(state){
            return state.currency
        },
        language(state){
            return state.language
        }
    }
    

})


export default store