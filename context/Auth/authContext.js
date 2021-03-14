import React,{useReducer} from 'react';
export const AuthContext = React.createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'login':{
            /*const name = action.payload.name;
            const uerInfo ={
                token:action.payload.token,
                authenticated:true,
                name:action.payload.name,
                family:action.payload.family,
                mobile:action.payload.mobile,
                wallet:action.payload.wallet,
                userImg:action.payload.userImg,
            };
            localStorage.setItem('user',JSON.stringify(uerInfo))
            localStorage.setItem('city_id',JSON.stringify(action.payload.city_id))
            localStorage.setItem('name',JSON.stringify(name))*/
            localStorage.setItem('balance',JSON.stringify(action.payload.balance))
            localStorage.setItem('accessToken',JSON.stringify(action.payload.token))
            return{authenticated:true}
        }
        case 'logout':
        {
            localStorage.removeItem('user');
            localStorage.removeItem('balance');
            localStorage.removeItem('refferalCode');
            localStorage.removeItem('accessToken');
            return{authenticated:false}
            break;
        }
        case 'balance':
        {
            localStorage.setItem('balance',JSON.stringify(action.payload.balance))
            localStorage.setItem('accessToken',JSON.stringify(action.payload.token))
            localStorage.setItem('orders',JSON.stringify(action.payload.orders))
            return{authenticated:false}
            break;
        }
        case 'refferalCode':
        {
            localStorage.setItem('refferalCode',JSON.stringify(action.payload.refferalCode))
            break;
        }
        default:
            return state;
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,false);
    return(
        <AuthContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;