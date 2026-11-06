import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FaBoxOpen } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { adminOrderTableColumn, adminPerformanceTableColumn } from '../../helper/tableColumn';
import { useDashboardPerformanceFilter } from '../../../hooks/usePerformanceFilter';
import Loader from '../../shared/Loader';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import AddPerformanceForm from './AddPerformanceForm';
import ImageUploadForm from './ImageUploadForm';
import PerformanceViewModal from '../../shared/PerformanceViewModal';
import Status from '../../shared/Status';
import toast from 'react-hot-toast';


const AdminPerformances = () => {
  
  // const performances = [ { "performanceId": 1352, "image": "http://localhost:8080/images/9669a7ab-26e7-4258-8925-420acf0e9560.png", "totalSeats": 80, "availableSeats": 80, "quantityInCart": null, "totalInCarts": null, "price": 2.0, "showDescription": "Obitelj napadaju demoni i preživljavaju samo dvoje članova — Tanjiro i njegova sestra Nezuko, koja se polako pretvara u demona. Tanjiro odlučuje postati ubojica demona kako bi osvetio svoju obitelj i izliječio sestru.", "discount": 10.0, "specialPrice": 1.8, "localDateTime": "2026-10-29T12:00:00", "showId": 6, "categoryName": "Akcija", "showName": "Demon Slayer", "status": "PUBLISHED" }, { "performanceId": 1353, "image": "http://localhost:8080/images/95578174-69a6-48ca-af3c-9dbfad1c6678.png", "totalSeats": 80, "availableSeats": 80, "quantityInCart": null, "totalInCarts": null, "price": 2.0, "showDescription": "Obitelj napadaju demoni i preživljavaju samo dvoje članova — Tanjiro i njegova sestra Nezuko, koja se polako pretvara u demona. Tanjiro odlučuje postati ubojica demona kako bi osvetio svoju obitelj i izliječio sestru.", "discount": 10.0, "specialPrice": 1.8, "localDateTime": "2026-10-29T14:00:00", "showId": 6, "categoryName": "Akcija", "showName": "Demon Slayer", "status": "PUBLISHED" } ];
  // const pagination = { pageNumber: 2, pageSize: 1, totalElements: 2, totalPages: 5, lastPage: false };

  const { performances, pagination } = useSelector((state) => state.performances);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // const [currentPage, setCurrentPage] = useState(
  //     pagination?.pageNumber + 1 || 1
  // );

  const [selectedPerformance, setSelectedPerformance] = useState('');

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [openAddModal, setOpenAddModal ] = useState(false);

  const [openImageUploadModal, setOpenImageUploadModal ] = useState(false);

  const [openPerformanceViewModal, setOpenPerformanceViewModal] = useState(false);


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;

  useDashboardPerformanceFilter();

  

  const tableRecords = performances?.map((item) => {

    return {
      id: item.performanceId,
      showName: item.showName,
      showDescription: item.showDescription,
      categoryName: item.categoryName,
      image: item.image,
      price: item.price,
      specialPrice: item.specialPrice,
      totalSeats: item.totalSeats,
      soldSeats: item.totalSeats - item.availableSeats,
      localDateTime: item.localDateTime,
      availableSeats: item.availableSeats,
      status: item.status,
      showId: item.showId,
      discount: item.discount,
      status: item.status,
      isAvailable:
            
            Number(item.availableSeats) > 0,
    };
  });

  const isAvailable =
    selectedPerformance?.status === "PUBLISHED" &&
    Number(selectedPerformance?.availableSeats) > 0;
  
    const description = selectedPerformance?.description;

  const handleEdit = (performance) => {
      if (Number(performance.soldSeats) > 0) {
          toast.error(
              "Ažuriranje nije moguće jer izvedba ima prodane ili rezervirane ulaznice."
          );
          return;
      }

      setSelectedPerformance(performance);
      setOpenUpdateModal(true);
  };


  const handlePerformanceView = (performance) => {
    setSelectedPerformance(performance);
    setOpenPerformanceViewModal(true);
  };

  const handleImageUpload = (performance) => {
    setSelectedPerformance(performance);
    setOpenImageUploadModal(true);
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    navigate(`${pathname}?${params.toString()}`);
};




  const emptyPerformance = !performances || performances?.length === 0;
  return (
    <div>
      <div className='pt-6 pb-10 flex justify-end'>
        <button
          onClick={() => setOpenAddModal(true)}
          className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <AiOutlineVideoCameraAdd />
            Kreiraj Izvedbu
        </button>
      </div>

      {!emptyPerformance && (
        <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
          Sve Izvedbe</h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
        {emptyPerformance ? (
          <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
            <FaBoxOpen size={50} className="mb-3" />
            <h2 className='text-2xl font-semibold'>
                Još nema kreiranih izvedbi
            </h2>
          </div>
        ) : (
          <div className='max-w-full'>
            <DataGrid
                className='w-full'
                  rows={tableRecords}
                  columns={adminPerformanceTableColumn(
                    handleEdit,
                    handleImageUpload,
                    handlePerformanceView
                  )}
                  loading={isLoading}
                  paginationMode='server'
                  rowCount={pagination?.totalElements || 0}
                 paginationModel={{
                    page: Math.max(0, Number(searchParams.get("page") || 1) - 1),
                    pageSize: pagination?.pageSize || 10,
                }}
                  onPaginationModelChange={handlePaginationChange}
                  disableRowSelectionOnClick
                  disableColumnResize
                  pageSizeOptions={[pagination?.pageSize || 10]}
                  //checkboxSelection
                  pagination
                  slotProps={{
                    pagination: {
                        showFirstButton: true,
                        showLastButton: true,
                    },
                }}
                  // paginationOptions={{
                  //   showFirstButton: true,
                  //   showLastButton: true,
                  //   hideNextButton: currentPage === pagination?.totalPages,
                    
                  // }}
                />
          </div>
        )}
        </>
      )}

      <Modal
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Ažuriranje izvedbe" : "Dodaj Izvedbu"}>
          <AddPerformanceForm 
            setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
            performance={selectedPerformance}
            update={openUpdateModal}
          />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title={"Dodaj fotografiju izvedbe"}>
          <ImageUploadForm 
            setOpen={setOpenImageUploadModal}
            performance={selectedPerformance}
          />
      </Modal>

      <PerformanceViewModal 
        open={openPerformanceViewModal}
        setOpen={setOpenPerformanceViewModal}
        performance={selectedPerformance} 
        isAvaiable={isAvailable}
      />
    </div>
  )
}

export default AdminPerformances