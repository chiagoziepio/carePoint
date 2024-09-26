import {createSlice} from "@reduxjs/toolkit"

const initialState = {
        patient: null,
        loading: false,
        isDrawerOpen : false
}
const PatientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers : {
        toggleDrawer : (state,action)=>{
            state.isDrawerOpen = state.isDrawerOpen ? false : true
            
        }
    }
})

export const {toggleDrawer} = PatientSlice.actions

export default  PatientSlice.reducer