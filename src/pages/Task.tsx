import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchTaskList, updateTaskList } from "../redux/slice/StoreTaskList";
import Item from "../components/Item";
// import { useParams } from "react-router-dom";
import NewTask from "../components/NewTask";

interface TaskList {
    id: number,
    project_id: string,
    created_at: Date,
    task_list: JSON,
    task_list_not_done: JSON,
}

const Task = () => {
    const id = "abc123XYZ456";

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        dispatch(fetchTaskList(id));
    }, [id])

    const taskData: TaskList[] = useSelector((state: any) => state.TaskList.data);

    console.log("DATA 2 Ya : ", taskData);

    const [{ isOver }, dropDone] = useDrop(() => ({
        accept: ["Not Done", "In Progress"],
        drop: (item) => addItemWithNewStatus(item, 'Done'),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [{ isOverToDo }, dropToDo] = useDrop(() => ({
        accept: ["Done", "In Progress"],
        drop: (item) => addItemWithNewStatus(item, 'Not Done'),
        collect: (monitor) => ({
            isOverToDo: !!monitor.isOver(),
        }),
    }));

    const [{ isOverOnProgress }, dropProgress] = useDrop(() => ({
        accept: ["Done", "Not Done"],
        drop: (item) => addItemWithNewStatus(item, 'In Progress'),
        collect: (monitor) => ({
            isOverOnProgress: !!monitor.isOver(),
        }),
    }));


    const [{ isOverRemove }, dropDelete] = useDrop(() => ({
        accept: ["Done", "Not Done", "In Progress"],
        drop: (item: any) => removeItem(item, 'delete'),
        collect: (monitor) => ({
            isOverRemove: !!monitor.isOver(),
        }),
    }));
    console.log(isOver, isOverToDo, isOverRemove, isOverOnProgress);

    const addItemWithNewStatus = (itemRef: any, newStatus: any) => {
        const item = { ...itemRef, status: newStatus };
        const method = newStatus;
        dispatch(updateTaskList({ item, method }));
    };


    const removeItem = (item: any, method: any) => {
        dispatch(updateTaskList({ item, method }));
    }

    return (
        <>
            <div className="flex w-full">
                <div className="w-full bg-slate-200">
                    <h2 className="text-2xl font-bold uppercase mb-4 bg-slate-900 text-white p-2">Task List</h2>
                    <div className="w-full space-y-1 min-h-screen p-4 py-2" ref={dropToDo}>
                        {taskData &&
                            taskData.map((data: any) => {
                                if (data && data.task_list.data) {
                                    const reversedData = [...data.task_list.data].reverse(); // Create a reversed copy
                                    return reversedData.map((item: any) => {
                                        if (item.status === 'Not Done') {
                                            return <Item data={item} key={item.created_at} />;
                                        }
                                        return null;
                                    });
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
                <div className="bg-slate-900 w-[20px] h-full"></div>
                <div className="w-full bg-slate-200">
                    <h2 className="text-2xl font-bold uppercase mb-4 bg-slate-900 text-white p-2">Task In Progress</h2>
                    <div className="w-full space-y-1 min-h-screen p-4 py-2" ref={dropProgress}>
                        {taskData &&
                            taskData.map((data: any) => {
                                if (data && data.task_list.data) {
                                    const reversedData = [...data.task_list.data].reverse(); // Create a reversed copy
                                    return reversedData.map((item: any) => {
                                        if (item.status === 'In Progress') {
                                            return <Item data={item} key={item.created_at} />;
                                        }
                                        return null;
                                    });
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
                <div className="bg-slate-900 w-[20px] h-full"></div>
                <div className="w-full bg-slate-200">
                    <h2 className="text-2xl font-bold uppercase mb-4 bg-slate-900 text-white p-2">Task Done</h2>
                    <div className="w-full space-y-1 min-h-screen p-4 py-2" ref={dropDone}>
                        {taskData &&
                            taskData.map((data: any) => {
                                if (data && data.task_list.data) {
                                    const reversedData = [...data.task_list.data].reverse(); // Create a reversed copy
                                    return reversedData.map((item: any) => {
                                        if (item.status === 'Done') {
                                            return <Item data={item} key={item.created_at} />;
                                        }
                                        return null;
                                    });
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
                <div className="border-red-500 border-dotted border-4 w-[200px] h-[200px] flex items-center justify-center fixed bottom-[20px] right-[20px]" ref={dropDelete}>
                    <div className="text-xl font-medium uppercase">Delete Item</div>
                </div>
            </div>
            <NewTask />
        </>
    )
}
export default Task;