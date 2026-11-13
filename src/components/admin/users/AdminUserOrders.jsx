import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { getOrdersByUserId } from "../../../store/actions";
import { adminOrderTableColumn } from "../../helper/tableColumn";

import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "./OrderDetailsModal";

const AdminUserOrders = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const location = useLocation();
    const userName = location.state?.userName;

    const { userOrders, userOrdersPagination } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(getOrdersByUserId(userId, "pageNumber=0&pageSize=10"));
    }, [dispatch, userId]);

    const handlePaginationChange = (paginationModel) => {
        const queryString = new URLSearchParams({
            pageNumber: paginationModel.page.toString(),
            pageSize: paginationModel.pageSize.toString(),
            sortBy: "orderDate",
            sortOrder: "desc",
        }).toString();

    dispatch(getOrdersByUserId(userId, queryString));
};

    const tableRecords = (userOrders || []).map((order) => ({
        id: order.orderId,
        email: order.email,
        totalAmount: order.totalAmount,
        status: order.orderStatus,
        date: order.orderDate,
    }));

    const columns = [
        ...adminOrderTableColumn(),
        {
            field: "action",
            headerName: "Radnje",
            sortable: false,
            disableColumnMenu: false,
            width: 160,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <button
                    type="button"
                    onClick={() => handleViewDetails(params.row.id)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 h-9 rounded-md hover:bg-blue-600 cursor-pointer"
                >
                    <FaEye />
                    Detalji
                </button>
            ),
        },
    ];
    

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [open, setOpen] = useState(false);

    const handleViewDetails = (orderId) => {
        const order = userOrders.find(
            (order) => order.orderId === orderId
        );

        if (!order) return;

        setSelectedOrder(order);
        setOpen(true);
    };



    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6">
                Rezervacije korisnika: {userName || `#${userId}`}
            </h1>

            <DataGrid
                rows={tableRecords}
                columns={columns}
                paginationMode="server"
                rowCount={userOrdersPagination?.totalElements ?? 0}
                paginationModel={{
                    page: userOrdersPagination?.pageNumber ?? 0,
                    pageSize: userOrdersPagination?.pageSize || 10,
                }}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                disableColumnMenu
                localeText={{
                    noRowsLabel: "Korisnik nema narudžbi",
                    MuiTablePagination: {
                        labelRowsPerPage: "Redaka po stranici:",
                        labelDisplayedRows: ({ from, to, count }) =>
                            `${from}–${to} od ${count}`,
                    },
                }}
            />
            <OrderDetailsModal
                open={open}
                setOpen={setOpen}
                order={selectedOrder}
            />
        </div>
    );
};

export default AdminUserOrders;