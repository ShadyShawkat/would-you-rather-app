import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import usersReducer from './usersSlice'
import questionReducer from './questionSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        questions: questionReducer
    }
})

export default store