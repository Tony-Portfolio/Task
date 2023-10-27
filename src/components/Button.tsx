import { Link } from "react-router-dom";
const Button = ({ data }: { data: any }) => {
    return (
        <>
            <Link to={`/p/${data.project_id}`}>
                <div className="">
                    <div className="bg-[#ff7043] text-white p-2 py-3 rounded border-4 border-black/20 after:content-[''] after:top-[4px] after:right-[4px] after:bg-white after:w-[15px] after:h-[6px] after:rounded relative after:absolute before:top-[4px] before:content-[''] before:absolute before:right-[25px] before:bg-white/70 before:h-[6px] before:w-[8px] before:rounded">
                        <div className="flex justify-between">
                            {data.project_name}
                            <div className="flex items-center gap-2">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="lime" className="w-5 h-5 bg-white rounded">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="red" className="w-5 h-5 bg-white rounded">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default Button;