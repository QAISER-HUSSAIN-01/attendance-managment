import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const stateManage = createSlice({
  name: 'stateManage',
  initialState,
  reducers: {
    formChanges: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { formChanges } = stateManage.actions

export default stateManage.reducer