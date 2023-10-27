import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabase";

interface Task {
    project_id: string,
    created_at: Date,
    project_name: string,
    email: string,
}




const initialState = {
    data: null as Task[] | null,
    loading: false,
    error: null as string | null
};

const fetchTask = createAsyncThunk("fetchTask", async () => {
    let { data: Task } = await supabase
        .from('Task')
        .select('*')

    return Task as Task[];
})

const TaskSlice = createSlice({
    name: "Task",
    initialState,
    reducers: {
        resetCollectionState: () => { return initialState }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTask.rejected, (state, action) => {
            state.error = action.error.message || "An error occured";
            state.loading = false;
            console.log("Error : ", action.payload)
        })
    }
})
export { fetchTask };
export const { resetCollectionState } = TaskSlice.actions;
export default TaskSlice.reducer;