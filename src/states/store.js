import { configureStore } from "@reduxjs/toolkit"
import rootReducer from './sliceReducers'

const store= configureStore({
  reducer: rootReducer
})


export {store}
