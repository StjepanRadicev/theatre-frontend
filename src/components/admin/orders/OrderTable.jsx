import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';



const OrderTable = ({ adminOrders, pagination}) => {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

const tableRecords = adminOrders?.map((item) => {
  return {
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  }
});

const handlePaginationChange = (paginationModel) => {
  const page = paginationModel.page + 1;
  setCurrentPage(page);
  params.set("page", page.toString());
  navigate(`${pathname}?${params.toString()}`);
}

const handleEdit = (order) => {
  setSelectedItem(order);
  setUpdateOpenModal(true);
}

  return (
    <div>
       <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
        Sve Rezervacije
      </h1>
        <div>
          <DataGrid
          className='w-full'
            rows={tableRecords}
            columns={adminOrderTableColumn(handleEdit)}
            paginationMode='server'
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            //checkboxSelection
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
              
            }}
          />
        </div>
      
    </div>
  )
}

export default OrderTable