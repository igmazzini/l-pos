export default{
    name:'lottery',
    component: ()=> import(/* webpackChunkName: "Lottery" */'@/modules/lottery/layout/LotteryLayout'),   
    children:[
      {
        path: 'selector',
        name:'selector',
        component: ()=> import(/* webpackChunkName: "Selector" */'@/modules/lottery/views/SelectorView')
      },
      {
        path: 'nuevosTiempos',
        name:'nuevosTiempos',
        component: ()=> import(/* webpackChunkName: "NuevosTiempos" */'@/modules/lottery/views/nuevosTiempos/NuevosTiemposView')
      },
      {
        path: 'tresMonazos',
        name:'tresMonazos',
        component: ()=> import(/* webpackChunkName: "TresMonazos" */'@/modules/lottery/views/tresMonazos/TresMonazosView')
      },
      {
        path: 'lotto',
        name:'lotto',
        component: ()=> import(/* webpackChunkName: "Lotto" */'@/modules/lottery/views/lotto/LottoView')
      },
      { 
        path: '',
        redirect:{name:'selector'}
       
      },
      
    ]
}