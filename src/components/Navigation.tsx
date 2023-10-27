import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchTask } from "../redux/slice/StoreTask";
import Button from "./Button";
import { timeAgo } from "../composables/getTime";

const Navigation = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const taskData: [] = useSelector((state: any) => state.Task.data) || [];

    useEffect(() => {
        dispatch(fetchTask());
    }, [])

    console.log("TASK DATA NAV : ", taskData)
    let previousTimeAgo = '';
    return (
        <>
            <div className="bg-[#ffccbc] sticky top-0 left-0 w-[250px] h-screen border-r-4 border-black/20">
                <div className="p-2">
                    <ul className="space-y-2">
                        {
                            taskData.map((data: any) => {
                                const currentAgo = timeAgo(data.created_at);

                                const displayTimeAgo = currentAgo !== previousTimeAgo ? currentAgo : '';

                                previousTimeAgo = currentAgo;

                                return (
                                    < li key={data.project_id} > {displayTimeAgo}<Button data={data} /></li>
                                )
                            }
                            )
                        }
                    </ul>
                </div>
            </div >
        </>
    )
}
export default Navigation;