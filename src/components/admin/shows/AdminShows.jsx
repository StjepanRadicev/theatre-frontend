
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import { deleteShow, fetchAllShows } from "../../../store/actions";
import { adminShowTableColumn } from "../../helper/tableColumn";
import ShowViewModal from "../../shared/ShowViewModal";
import Modal from "../../shared/Modal";
import AddShowForm from "./AddShowForm";
import toast from "react-hot-toast";

const AdminShows = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();

    const { shows, pagination } = useSelector((state) => state.shows);
    const { isLoading } = useSelector((state) => state.errors);

    const [selectedShow, setSelectedShow] = useState(null);
    const [openShowViewModal, setOpenShowViewModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showToDelete, setShowToDelete] = useState(null);


    const handleEdit = (show) => {
        setSelectedShow(show);
        setOpenUpdateModal(true);
    };

    const handleShowView = (show) => {
        setSelectedShow(show);
        setOpenShowViewModal(true);
    };

    const handleDelete = (show) => {
        setShowToDelete(show);
        setOpenDeleteModal(true);
    };


    const handleConfirmDelete = () => {
        if (!showToDelete) return;

        const params = new URLSearchParams();

        const currentPage = Number(searchParams.get("page") || 1);

        params.set("pageNumber", String(currentPage - 1));

        dispatch(
            deleteShow(
                toast,
                showToDelete.id,
                setOpenDeleteModal,
                params.toString()
            )
        );
    };


    useEffect(() => {
        const currentPage = Number(searchParams.get("page") || 1);

        const params = new URLSearchParams();
        params.set("pageNumber", String(currentPage - 1));

        dispatch(fetchAllShows(params.toString()));
    }, [dispatch, searchParams]);

    const tableRecords = shows?.map((item) => ({
        id: item.showId,
        showName: item.showName,
        duration: item.duration,
        description: item.description,
        categoryName: item.categoryName,
    })) || [];

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        navigate(`${pathname}?${params.toString()}`);
    };

    const emptyShows = tableRecords.length === 0;

    return (
        <div>
            <div className="pt-6 pb-10 flex justify-end">
                <button
                onClick={() => setOpenAddModal(true)}
                    className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
                >
                    <AiOutlineVideoCameraAdd />
                    Kreiraj Predstavu
                </button>
            </div>

            {!emptyShows && (
                <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
                    Sve Predstave
                </h1>
            )}

            {isLoading ? (
                <Loader />
            ) : emptyShows ? (
                <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                    <FaBoxOpen size={50} className="mb-3" />
                    <h2 className="text-2xl font-semibold">
                        Još nema kreiranih predstava
                    </h2>
                </div>
            ) : (
                <div className="max-w-full">
                    <DataGrid
                        className="w-full"
                        rows={tableRecords}
                        columns={adminShowTableColumn(handleEdit, handleShowView, handleDelete)}
                        loading={isLoading}
                        paginationMode="server"
                        rowCount={pagination?.totalElements || 0}
                        paginationModel={{
                            page: Math.max(
                                0,
                                Number(searchParams.get("page") || 1) - 1
                            ),
                            pageSize: pagination?.pageSize || 10,
                        }}
                        onPaginationModelChange={handlePaginationChange}
                        disableRowSelectionOnClick
                        disableColumnResize
                        pageSizeOptions={[pagination?.pageSize || 10]}
                        pagination
                        slotProps={{
                            pagination: {
                                showFirstButton: true,
                                showLastButton: true,
                            },
                        }}
                    />
                </div>
            )}
            <ShowViewModal
              open={openShowViewModal}
              setOpen={setOpenShowViewModal}
              show={selectedShow}
          />
          <Modal
              open={openUpdateModal || openAddModal}
              setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
              title={openUpdateModal ? "Ažuriranje predstave" : "Dodaj predstavu"}
          >
              <AddShowForm
                  setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
                  show={selectedShow}
                  update={openUpdateModal}
              />
          </Modal>

          <Modal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            title="Potvrda brisanja predstave"
        >
            <div className="space-y-5">
                <p className="text-gray-700">
                    Jeste li sigurni da želite obrisati predstavu
                    <span className="font-semibold">
                        {" "}{showToDelete?.showName}
                    </span>?
                </p>

                <p className="text-sm text-red-600">
                    Predstavu je moguće obrisati samo ako nema povezanih izvedbi.
                    Ova radnja je nepovratna.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setOpenDeleteModal(false)}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                        Odustani
                    </button>

                    <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                        Obriši
                    </button>
                </div>
            </div>
        </Modal>
        </div>
    );
};

export default AdminShows;
