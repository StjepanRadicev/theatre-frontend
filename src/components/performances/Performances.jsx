import { FaExclamationTriangle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchPerformances } from "../../store/actions";
import Filter from "./Filter";
import usePerformanceFilter from "../../hooks/usePerformanceFilter";
import { DNA } from "react-loader-spinner";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import PerformanceCard from "../shared/PerformanceCard";



const Performances = () => {

    const {isLoading, errorMessage} = useSelector(
        (state) => state.errors
    );

    const {performances, categories, pagination} = useSelector(
        (state) => state.performances
    )

    const dispatch = useDispatch();

    usePerformanceFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14  2xl:mx-auto bg-gray-800">
            <Filter categories={categories ? categories : []}/>
            {isLoading ? (
                <Loader></Loader>
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-50">
                    <FaExclamationTriangle className="text-slate-100 text-3xl mr-2"/>
                    <span className="text-slate-100 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h[700px]">
                    <div className="pb-6 pt-14 grid 2xl:grid-cols-1  lg:grid-cols-1  sm:grid-cols-1  gap-y-6 gap-x-6">
                         {performances &&
                         performances.map((item, i) => <PerformanceCard key={i} {...item} /> 
                         )}
                    </div>
                    <div className="flex justify-center pt-10 ">
                        <Paginations
                            numberOfPage = {pagination?.totalPages}
                            totalPerformances = {pagination?.totalElements} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Performances;