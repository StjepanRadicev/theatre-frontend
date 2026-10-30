import { useDispatch, useSelector } from "react-redux";
import Performances from "../performances/Performances";
import HeroBanner from "./HeroBanner";
import PerformanceCard from "../shared/PerformanceCard";
import { useEffect } from "react";
import { fetchPerformances } from "../../store/actions";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {

    const dispatch = useDispatch();

     const {performances} = useSelector(
        (state) => state.performances
    )

    const {isLoading, errorMessage} = useSelector(
        (state) => state.errors
    );

     useEffect(() => {
            dispatch(fetchPerformances());
        }, [dispatch]);


    return (
        <div className="lg:px-14 sm:px-8 px-4 bg-gray-800">
            <div className="py-6">
                <HeroBanner />
            </div>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-700 text-2xl font-bold"></h1>
                        <span className="text-slate-600">
                            
                        </span>
                   
                </div>

                {isLoading ? (
                    <Loader />
                ) : errorMessage ? (
                    <div className="flex justify-center items-center h-50">
                        <FaExclamationTriangle className="text-slate-900 text-3xl mr-2"/>
                        <span className="text-slate-500 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>
                ) : (
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-1  lg:grid-cols-1  sm:grid-cols-1  gap-y-6 gap-x-6">
                        {performances &&
                        performances.slice(0,2)
                                    .map((item, i) => <PerformanceCard key={i} {...item} /> 
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;















