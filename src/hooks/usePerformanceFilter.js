import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardPerformancesAction, fetchPerformances } from "../store/actions";

const usePerformanceFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);

        const sortOrder = searchParams.get("sortDir") || "asc";
        const sortBy = searchParams.get("sortBy") || "localDateTime";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("name") || null;

        params.set("sortBy", sortBy);
        params.set("sortDir", sortOrder);
        
        if (categoryParams) {
            params.set("category", categoryParams);
        }

        if (keyword) {
            params.set("name", keyword);
        }


        const queryString = params.toString();
        console.log("QUERY STRING", queryString);

        dispatch(fetchPerformances(queryString));

    }, [dispatch, searchParams]);
    
    
   
};



export const useDashboardPerformanceFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);

        const queryString = params.toString();
        dispatch(dashboardPerformancesAction(queryString));

    }, [dispatch, searchParams]);
    
    
   
};

export default usePerformanceFilter;