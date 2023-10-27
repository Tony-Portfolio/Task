import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slice/StoreTask";
import TaskListReducer from "./slice/StoreTaskList";

const rootReducer = combineReducers({
    Task: TaskReducer,
    TaskList: TaskListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
