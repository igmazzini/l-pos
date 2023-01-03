


const isAuthenticatedGuard = async( to, from, next) => {
   
    
   
    if( localStorage.getItem('authorized')  && localStorage.getItem('authorized') == 'true') {
        
       
        next();

    }else{ 

        next({ name: 'login-page'})
    }
    
} 

export default isAuthenticatedGuard;