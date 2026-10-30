import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage, totalPerformances }) => {

    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    }


    return(
        <Pagination 
            count={numberOfPage}
            page={paramValue}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            shape="rounded"
            onChange={onChangeHandler}
            sx={{
            "& .MuiPaginationItem-root": {
                                    color: "white",
                                    
                        "&:hover": {
                                     backgroundColor: "rgba(255,255,255,0.2)",
                                     border: "1px solid white",
                                    }
                },
                 "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#e5e7eb",
                    color: "black",

                    "&:hover": {
                                     backgroundColor: "rgba(255,255,255,0.2)",
                                     border: "1px solid white",
                                     color: "white"
                                    }
}
        }} />
    )
};

export default Paginations;