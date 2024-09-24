import {createSlice} from "@reduxjs/toolkit"

const initialState = {
        patient: null,
        loading: false,
}
const PatientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers : {}
})

export default  PatientSlice.reducer