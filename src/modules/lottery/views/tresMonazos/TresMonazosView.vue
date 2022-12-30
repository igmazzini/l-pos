<script src="./TresMonazos.js"></script>
<template>
 <Transition  >
      <TicketModal @on-accept="onPrintAccept" @on-cancel="onPrintCancel" :game="game.name" :logo="require('@/modules/lottery/assets/img/'+game.img)" :numbers="raffles" v-if="showPrintModal">
        <template v-slot:numbers-list>
          <TicketModalNumbers :numbers="raffles"/>
        </template>
        <template v-slot:print-ticket-numbers>
          <PrintTicketNumbers  :numbers="raffles"/>
        </template>

      </TicketModal>
    </Transition>  
   
  <div class="game-layout">
     <div class="game-layout-info">
       <img v-if="!mobile" :src="require('@/modules/lottery/assets/img/'+game.img)" :alt="game.name" class="info-image">  
       
       <div class="info-numbers-container">
         <DisplayInfo @on-delete="onDelete" :numbers="raffles"/>
       </div>
       <div v-if="!mobile"  class="divider"></div> 
       <div v-if="!mobile"  class="game-layout-info--totals">
         <p>{{t('ticketResumeLabel')}}</p>
         <p>{{t('ticketTotalAmountLabel')}}{{currency}}</p>
         <p>{{totalBet}}</p>
        
          <button class="btn clear-button" @click="onClear">{{t('clearLabelButton')}}</button>
       </div> 
       <div v-if="mobile" @click="onMobileDelete" class="game-layout-info--delete">
          <TrashCanOutline/>
       </div>
      
       <DeleteMobileMenu @on-delete="onMobileMenuClear"  @on-close="onMobileMenuClose" v-if="mobile && showDeleteMenu"/> 
      
     
    </div>
    <div class="game-layout-display">     
      <DisplayNumbers :numbers="[raffleNumber]"/>
      <DisplayBet  :bet="bet" :betLabel="t('betAmountLabel')+currency"/>     
      <DisplayNotifications v-if="!mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/>
      <SelectType v-if="!mobile"  @type-change="onBetTypeChange" :title="t('betTypeLabel')" :buttons="typeButtons"/>

     
    </div>
    <div class="game-layout-controls">
       
       <DisplayNotifications v-if="mobile" :title="t('notificationsLabel')" :type="notificationType" :notification="notificationText"/> 
       <SelectType v-if="mobile"  @type-change="onBetTypeChange" :title="t('betTypeLabel')" :buttons="typeButtons"/>
       <button class="btn blind-rooster" @click="onBlindRooster">{{t('blindRooster')}}</button>
       <SelectBet @bet-change="onBetChange" :buttons="betButtons" :title="t('betButtonsLabel')+currency"/> 

       <div v-if="mobile" @click="onMobileDates" class="game-layout-controls-dates--button">
          <CalendarArrowLeft/>
       </div>
       
       <div v-if="!mobile" class="control-dates">
         <p class="cotrol-date-title">{{t('rafflesLabel')}}</p>
         <div class="control-select-dates">
           <SelectDate v-for="(date,index) of dates" :key="index" @date-change="onDateChange" @time-change="onTimeChange" :today="(index == 0) ? true : false" :times="['M','N']" :date="date.date" :index="index"/>
         </div>         
         <div class="cotrol-times">
            <p>{{t('raffleMorningLabel')}} {{morningTime}}</p>  
            <p>{{t('raffleNightLabel')}} {{nightTime}}</p>  
         </div> 
       </div> 
                     
       <KeyBoard @keyboard-change="onKeyBoardChange" :buttons="keyBoardButtons" :printDisabled="emptyRaffles"/>
       <keep-alive>
        <DatesMobileMenu ref="mobileDateMenu" @on-accept="onMobileDatesAccept" @on-cancel="onMobileDatesCancel"  @on-close="onMobileDatesClose" v-if="mobile" :morningTime="morningTime" :nightTime="nightTime" :dates="dates" :times="times" @on-mobile-date-change="onDateChange" @on-mobile-time-change="onTimeChange" />
       </keep-alive>
       <div v-if="!mobile" class="control-footer">
         <div class="control-footer-logo">
           <p>{{t('poweredBy')}}</p>
           <img  src="@/assets/img/logo_footer.svg" alt="logo-footer">
         </div>
         
         <p>{{version}}</p>
       </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "./tres-monazos.scss";
 
</style>