import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers"
const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
})
// This initial state can be used to hold authentication token fron local storage
// Or cart items from local storage that are already added

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
}
const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
