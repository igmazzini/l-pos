import { createStore } from 'vuex'
import authStore from '../modules/auth/store'
import lotteryStore from '../modules/lottery/store'

const store = createStore({

    state:{
        version:'V 2.0',
        title:'Loteria',
        currency:'₡',
        mobile:false,
        isLoading:false,
        isPrinting:false,
        language:'ENG_US',
    },
    mutations:{
        setLoading(state,loading){
            state.isLoading = loading;
        },
        setPrinting(state,printing){
            state.isPrinting = printing;
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
        },
        isPrinting(state){
            return state.isPrinting
        }
    }
    

})


export default store