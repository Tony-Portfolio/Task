import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { supabase } from "../supabase";

interface TaskListDataItem {
    title: string;
    content: string;
    status: "Not Done" | "In Progress" | "Completed";
    created_at: string;
    id: string;
    file: null | File;
    fileNames: string;
}

interface TaskListDone {
    data: TaskListDataItem[];
}

interface TaskListEntry {
    id: number;
    created_at: string;
    project_id: string;
    task_list: TaskListDone;
    email: string;
    Task: {
        project_id: string;
    };
}

// An array of TaskListEntry
type TaskList = TaskListEntry[];


const initialState = {
    data: null as TaskList[] | null,
    loading: false,
    error: null as string | null,
};


const fetchTaskList = createAsyncThunk("fetchTaskList", async (id: any) => {
    const { data: data2, error } = await supabase.auth.signInWithPassword({
        email: 'rakaoktoramadhan@gmail.com',
        password: '123321',
    });

    console.log("LOGIN : ", data2, error);

    const { data: TaskList } = await supabase
        .from('TaskList')
        .select(`*, Task(project_id)`)
        .eq('project_id', id);

    return TaskList;
});

const insertNewItem = async (newItem: any, id: any) => {
    try {
        console.log("NEW ITEM : ", newItem, "ID : ", id);
        const { data, error } = await supabase.from("TaskList")
            .update({ task_list: newItem })
            .eq("project_id", id)
            .select();

        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log("Success", data);
        }
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

const TaskListSlice = createSlice({
    name: "TaskList",
    initialState,
    reducers: {
        resetCollectionState: () => initialState,
        updateTaskList: (state: any, action) => {
            if (state.data!.length > 0) {
                const { item, method } = action.payload;
                console.log("ITEM NYA : ", item)
                const updatedData = state.data![0].task_list?.data || [];
                const filteredData = updatedData.filter((items: any) => items && items.id !== item.id);
                if (item) {
                    if (method !== "delete") filteredData.push(item);
                    console.log("CUY : ", filteredData);
                    state.data![0]!.task_list.data = filteredData;
                    const currentState: any = current(state);
                    insertNewItem(currentState.data[0]!.task_list, state.data![0].project_id);
                }
            }
            else {
                const { item, method, id } = action.payload;
                const insertedData = {
                    "data": [
                        item
                    ]
                }
                console.log("method", method);
                insertNewItem(insertedData, id);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTaskList.pending, (state: any) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTaskList.fulfilled, (state: any, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTaskList.rejected, (state: any, action) => {
            state.error = action.error.message || "An error occurred";
            state.loading = false;
        });
    },
});

export { fetchTaskList };
export const { resetCollectionState, updateTaskList } = TaskListSlice.actions;
export default TaskListSlice.reducer;
