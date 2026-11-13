
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaBoxOpen, FaUser } from "react-icons/fa";

import Loader from "../../shared/Loader";
import { adminUserTableColumn } from "../../helper/tableColumn";
import { useDashboardUserFilter } from "../../../hooks/useUserFilter";
import DeleteUserDialog from "./DeleteUserDialog";
import { deleteAdminUser, dashboardUsersAction } from "../../../store/actions";



const AdminUsers = () => {
    const { users, pagination } = useSelector((state) => state.users);
    const { isLoading } = useSelector((state) => state.errors);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    useDashboardUserFilter();


    const tableRecords = users?.map((user) => ({
        id: user.userId,
        userName: user.userName,
        email: user.email,
        emailVerified: user.emailVerified,
        roles: user.roles,
    })) || [];

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        navigate(`${pathname}?${params.toString()}`);
    };


    const handleViewOrders = (userId, userName) => {
        navigate(`/admin/users/${userId}/orders`, {
            state: { userName },
        });
    };

    const handleDeleteUser = (userId, userName) => {
        setSelectedUser({ userId, userName });
        setDeleteDialogOpen(true);
    };

    
const handleConfirmDelete = async () => {
    if (!selectedUser || isDeleting) return;

    setIsDeleting(true);

    try {
        const success = await dispatch(
            deleteAdminUser(selectedUser.userId)
        );

        if (success) {
            setDeleteDialogOpen(false);
            setSelectedUser(null);

            const params = new URLSearchParams();

            params.set("pageNumber", currentPage.toString());
            params.set("pageSize", "10");

            const currentSearch = searchParams.get("search");

            if (currentSearch?.trim()) {
                params.set("search", currentSearch.trim());
            }

            await dispatch(dashboardUsersAction(params.toString()));
        }
    } finally {
        setIsDeleting(false);
    }
};



    const currentPage = Math.max(
        0,
        Number(searchParams.get("page") || 1) - 1
    );


    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentSearch = searchParams.get("search") || "";

            if (search.trim() === currentSearch) return;

            const params = new URLSearchParams(searchParams);

            if (search.trim()) {
                params.set("search", search.trim());
            } else {
                params.delete("search");
            }

            params.set("page", "1");

            navigate(`${pathname}?${params.toString()}`, {
                replace: true,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, searchParams, navigate, pathname]);




    return (
        <div>
            <div className="flex justify-end pt-6 pb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pretraži korisnike..."
                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <h1 className="text-slate-800 text-3xl text-center font-bold pt-6 pb-6 uppercase">
                Upravljanje korisnicima
            </h1>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {tableRecords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                            <FaUser size={50} className="mb-3" />
                            <h2 className="text-2xl font-semibold">
                                Nema pronađenih korisnika
                            </h2>
                        </div>
                    ) : (
                        <div className="max-w-full">
                            <DataGrid
                                className="w-full"
                                rows={tableRecords}
                                columns={adminUserTableColumn(handleViewOrders)}
                                sx={{
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: 600,
                                        color: "#000",
                                    },
                                }}
                                loading={isLoading}
                                paginationMode="server"
                                rowCount={pagination?.totalElements ?? 0}
                                paginationModel={{
                                    page: currentPage,
                                    pageSize: pagination?.pageSize || 10,
                                }}
                                onPaginationModelChange={handlePaginationChange}
                                disableRowSelectionOnClick
                                disableColumnResize
                                pageSizeOptions={[10]}
                                pagination
                                localeText={{
                                    noRowsLabel: "Nema korisnika",
                                    noResultsOverlayLabel: "Nema rezultata",
                                    MuiTablePagination: {
                                        labelRowsPerPage: "Redaka po stranici:",
                                        labelDisplayedRows: ({ from, to, count }) =>
                                            `${from}–${to} od ${count}`,
                                    },
                                }}
                                slotProps={{
                                    pagination: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                    },
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            <DeleteUserDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                user={selectedUser}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default AdminUsers;
