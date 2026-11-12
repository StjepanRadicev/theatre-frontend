import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardUsersAction } from "../store/actions";

export const useDashboardUserFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    
    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        const search = searchParams.get("search") || "";

        params.set("pageNumber", Math.max(0, currentPage - 1));
        params.set("pageSize", "10");

        if (search.trim()) {
            params.set("search", search.trim());
        }

        dispatch(dashboardUsersAction(params.toString()));

    }, [dispatch, searchParams]);

};