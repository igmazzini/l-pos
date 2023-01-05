import { ref, computed } from "vue";
import { useRipple } from "@/modules/shared/composables/useRipple";

export const useGameUI = () => {


    const { createRipple } = useRipple();

    const gameDefaultBetTypeIndex = ref(-1);
    const gameDefaultBetIndex = ref(-1);
    const gameDefaultDateIndex = ref(0);

    const deleteMobileMenu = ref(null);
    const mobileDateMenu = ref(null);
    const printModal = ref(false);

    const customBetMode = ref(false);
    const blindRoosterMode = ref(false);

    const defaultBetTypeIndex = computed(() => gameDefaultBetTypeIndex.value);
    const defaultBetIndex = computed(() => gameDefaultBetIndex.value);
    const defaultDateIndex = computed(() => gameDefaultDateIndex.value);
    const customBet = computed(() => customBetMode.value);
    const blindRooster = computed(() => blindRoosterMode.value);


    const setDefaultBetTypeIndex = (val) => {
        gameDefaultBetTypeIndex.value = val;
    }
    const setDefaultBetIndex = (val) => {
        gameDefaultBetIndex.value = val;
    }
    const setDefaultDateIndex = (val) => {
        gameDefaultDateIndex.value = val;
    }
    const setCustomBetMode = (val) => {
        customBetMode.value = val;
    }
    const setBlindRoosterMode = (val) => {
        blindRoosterMode.value = val;
    }

    const showPrintModal = () => {

        createRipple(event);
        printModal.value = true;
    }

    const hidePrintModal = () =>{
        printModal.value = false;
    } 

    const showDeleteMenu = () =>{
        deleteMobileMenu.value?.showMenu();
    }

    const hideDeleteMenu = () =>{
        deleteMobileMenu.value?.hideMenu();
    }

    const showDatesMenu = () =>{
        mobileDateMenu.value?.showMenu();
    }
    const hideDatesMenu = () =>{
        mobileDateMenu.value?.hideMenu();
    }

   
   


    return {
        defaultBetTypeIndex,
        defaultBetIndex,
        defaultDateIndex,
        customBet,
        blindRooster,
        deleteMobileMenu,
        mobileDateMenu,
        printModal,

        setDefaultBetTypeIndex,
        setDefaultBetIndex,
        setDefaultDateIndex,
        setCustomBetMode,
        setBlindRoosterMode,
        showPrintModal,       
        hidePrintModal,
        showDeleteMenu,
        hideDeleteMenu,
        showDatesMenu,
        hideDatesMenu,
      
    }

}