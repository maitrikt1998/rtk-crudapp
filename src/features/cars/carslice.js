import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchALLCars = createAsyncThunk("cars/getAPI", async()=>{
    const response = await axios.get("http://localhost:4000/cars");
    return response.data;
});

export const saveNewCar = createAsyncThunk(
    "cars/createAPI",
    async(payload) => {
        const response = await axios.post("http://localhost:4000/cars",payload);
        return response.data;
    }
)

const initialState = {
    carsData : [],
    loading: "idle",
};

const carslice = createSlice({
    name:"cars",
    initialState,
    reducers:{
        // allCarsLoading: (state) => {
        //     if(state.loading === "idle"){
        //         state.loading = "pending";
        //     }
        // },
        // allCarsReceived: (state, {payload}) => {
        //     state.loading = "idle";
        //     state.carsData = payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchALLCars.pending, (state,action)=> {
            state.loading = "pending";
        });
        builder.addCase(fetchALLCars.fulfilled, (state,action)=> {
            state.loading = "idle";
            state.carsData = action.payload;
        });
        builder.addCase(saveNewCar.pending, (state,action)=> {
            state.loading = "pending";
        });
        builder.addCase(saveNewCar.fulfilled, (state,action)=> {
            state.loading = "idle";
            state.carsData.unshift(action.payload);
        });
    }
});

// export const { allCarsLoading, allCarsReceived } = carslice.actions;
export const getAllCars = (state) => state.car.carsData;
export const getLoading  = (state) => state.car.loading;

export default carslice.reducer;