import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import usersReducer from './usersSlice'
import questionReducer from './questionSlice'
import uiReducer from './uiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        questions: questionReducer,
        ui: uiReducer,
    }
})

export default store