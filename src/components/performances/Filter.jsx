import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
//import { parseDateForNavigation } from "react-datepicker/dist/dist/date_utils.js";
import { FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {
    

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("localDateTime");

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortDir") || "asc";
    const currentSortBy = searchParams.get("sortBy") || "localDateTime";
    const currentSearchTerm = searchParams.get("name") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSortBy(currentSortBy);
    setSearchTerm(currentSearchTerm);

}, [searchParams]);

   useEffect(() => {
        const handler = setTimeout(() => {
            const newParams = new URLSearchParams(window.location.search);
            const currentName = newParams.get("name") || "";

            if (currentName === searchTerm) return;

            if (searchTerm) {
                newParams.set("name", searchTerm);
            } else {
                newParams.delete("name");
            }

            newParams.set("page", "1");

            navigate(`${pathname}?${newParams.toString()}`);
        }, 700);

        return () => clearTimeout(handler);
    }, [searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if(selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category" , selectedCategory);
        }

        navigate(`${pathname}?${params}`);

        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);

            const newParams = new URLSearchParams(params);
            newParams.set("sortDir", newOrder);
            navigate(`${pathname}?${newParams}`);
            };

        const handleClearFilters = () => {
            navigate({ pathname : window.location.pathname });

    };



    const handleSortByChange = (event) => {
        const selectedSortBy = event.target.value;

        const newParams = new URLSearchParams(searchParams);

        newParams.set("sortBy", selectedSortBy);
        newParams.set("page", "1");

        navigate(`${pathname}?${newParams.toString()}`);
    };



    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text"
                       placeholder="Traži predstave"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="border border-gray-50 text-slate-50 rounded-sm py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2"
                />
                <FiSearch className="absolute left-3 text-slate-50"/>   
            </div>

            {/* Category Selection */}
            <div className="flex sm:flex-row flex-col gap-4 items-center text-slate-50 border-slate-50">
                <FormControl
                sx={{ minWidth: 120,// okvir (border)
                                "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white",},
                                 "&:hover fieldset": { borderColor: "white",},
                                "&.Mui-focused fieldset": { borderColor: "white",},
                                                            },
                    }}
                    className="text-slate-50 border-slate-50"
                    variant="outlined"
                    size="small">
                        <InputLabel id="category-select-label" className="min-w-[120px] text-gray-50 border-slate-50"  
                        sx={{color: "white",
                                    "&.Mui-focused": {color: "white",
                                                        },
                            }}>Kategorije
                        </InputLabel>
                        <Select
                         sx={{color: "white",// ikonica strelice
                                                ".MuiSvgIcon-root": {
                                                color: "white",
                                                },
                            }}
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Kategorije"
                            className="min-w-[120px] text-slate-50 border-slate-50 "
                            > 
                        <MenuItem value="all"
                        className=" text-slate-500 border-slate-500 "
                        >Sve</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem> 
                        ))}
                        </Select>

                </FormControl>

                {/* Sort By Selection */}
<FormControl
    size="small"
    sx={{
        minWidth: 160,
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
        },
    }}
>
    <InputLabel
        shrink
        id="sort-by-label"
        sx={{
            color: "white",
            "&.Mui-focused": { color: "white" },
        }}
    >
        Sortiraj prema
    </InputLabel>

    <Select
        labelId="sort-by-label"
        value={sortBy}
        label="Sortiraj prema"
        onChange={handleSortByChange}
        sx={{
            color: "white",
            ".MuiSvgIcon-root": { color: "white" },
        }}
    >
        <MenuItem value="localDateTime">Datum i vrijeme</MenuItem>
        {/* <MenuItem value="showName">Ime predstave</MenuItem> */}
        <MenuItem value="price">Cijena</MenuItem>
    </Select>
</FormControl>
                {/* Sort Button & Clear Filter */}
                        <Tooltip >
                            <Button variant="contained" color="primary" className="flex items-center gap-2 h-10"
                                    onClick={toggleSortOrder}>
                                Sortiraj
                                {sortOrder === "asc" ? (
                                    <FiArrowUp size={20} />
                                ) : (
                                    <FiArrowDown size={20} />
                                )
                            }
                                
                            </Button>
                        </Tooltip>
                        <button
                        className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-sm transition duation-300 ease-in shadow-md cursor-pointer"
                        onClick={handleClearFilters}>
                            <FiRefreshCcw className="font-semibold" size={16}/>
                            <span className="font-semibold">Očisti filter</span>
                        </button>
            </div>
        </div>
    )
}

export default Filter;      