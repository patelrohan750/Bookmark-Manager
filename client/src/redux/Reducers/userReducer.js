const initialState={
    isAuth:false,
    user:null,
    
}

export const userReducer=(state=initialState,action)=>{
   switch(action.type){
       case "SET_USER":
           const {user}=action.payload;
       
           return {
               ...state,
               user,
               isAuth:user===null?false:true
           }
        default: return state
      
   }
}
