import { computed } from "vue";
import { useStore } from "vuex";

export const useLottery = ()=>{

    const store = useStore();


    const games = computed( ()=> store.getters["lotteryStore/games"]);


    return {
        games
    }

};