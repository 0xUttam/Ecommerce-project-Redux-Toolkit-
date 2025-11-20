import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}

const addToCart = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            console.log(action.payload)
            state.items.push(action.payload)
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        removeItem:(state,action)=>{
            const cartData = state.items.filter(item => item.id != action.payload.id)
            state.items = cartData
            localStorage.setItem('cart',JSON.stringify(cartData))
        },
        clearAllItem:(state)=>{
            state.items=[];
        }
    }
})

export const {addItem, removeItem, clearAllItem} = addToCart.actions
export default addToCart.reducer