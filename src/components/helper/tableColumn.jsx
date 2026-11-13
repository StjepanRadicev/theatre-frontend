import { FaEdit, FaEye, FaImage, FaTrash, FaTrashAlt } from "react-icons/fa";



export const adminShowTableColumn = (
  handleEdit,
  handleShowView,
  handleDelete
) => [
  
    {
        field: "showName",
        headerName: "Naziv predstave",
        flex: 1,
        minWidth: 180,
        headerAlign: "center",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
        field: "duration",
        headerName: "Trajanje (min)",
        width: 140,
        headerAlign: "center",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
        field: "description",
        headerName: "Opis",
        flex: 2,
        minWidth: 250,
        headerAlign: "center",
        sortable: false,
        disableColumnMenu: true,
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
        field: "categoryName",
        headerName: "Kategorija",
        width: 160,
        headerAlign: "center",
        align: "center",
        sortable: false,
        disableColumnMenu: true,
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
      field: "action",
      headerName: "Radnje",
      headerAlign: "center",
      editable: false,
      headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
      cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
      sortable: false,
      filterable: true,
      disableColumnMenu: false,
      width: 370,
      renderHeader: (params) => <span >Radnje</span>,
      renderCell: (params) => {
        return (
          <div className='flex jstify-center items-center space-x-2 h-full pt-2'>
            <button
              onClick={() => handleEdit(params.row)}
              className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
                <FaEdit className='mr-2'/>
                Ažuriraj
            </button>
            <button
            onClick={() => handleShowView(params.row)}
            className='flex items-center bg-slate-800 text-white px-4 h-9 rounded-md'>
              <FaEye className='mr-2'/>
              Prikaži
          </button>
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 h-9 rounded-md"
        >
            <FaTrash className="mr-2" />
            Obriši
        </button>
        </div>
      )
    }
  },
];





export const adminPerformanceTableColumn = (
  handleEdit,
  handleImageUpload,
  handlePerformanceView,
  handleDelete
) => [
  // { 
  //   sortable: false,
  //   disableColumnMenu: true,
  //   field: "id",
  //   headerName: "ID",
  //   width: 75,
  //   headerAlign: "center",
  //   editable: false,
  //   headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
  //   cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
  //   renderHeader: (params) => <span  className="text-center">ID</span>
  //  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "showName",
    headerName: "Performance Name",
    width: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Naziv Predstave</span>
   },
  
  {
    sortable: false,
    disableColumnMenu: true,
    field: "price",
    headerName: "Cijena",
    width: 100,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Cijena (€)</span>,
    valueFormatter: (value) =>
        value == null ? "" : Number(value).toFixed(2),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "discount",
    headerName: "Popust",
    width: 100,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Popust (%)</span>
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "localDateTime",
    headerName: "Početak Izvedbe",
    width: 175,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Početak Izvedbe</span>,
    valueFormatter: (value) =>
        value
            ? new Date(value).toLocaleString("hr-HR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "",
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Naziv Kategorije",
    width: 130,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Naziv Kategorije</span>
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "totalSeats",
    headerName: "Broj Sjedala",
    width: 100,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Broj Sjedala</span>
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "soldSeats",
    headerName: "Broj Prodanih Sjedala",
    width: 100,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Prodana Sjedala</span>
  },
  
  {
    sortable: false,
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    width: 100,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Status</span>,
     valueFormatter: (value) => {
        const statusLabels = {
            PUBLISHED: "Objavljeno",
            DRAFT: "Nacrt",
            CANCELLED: "Otkazano",
            FINISHED: "Završeno",
            SOLD_OUT: "Rasprodano",
        };

        return statusLabels[value] || value;
    },
  },
  {
    field: "action",
    headerName: "Radnje",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    sortable: false,
    width: 460,
    renderHeader: (params) => <span >Radnje</span>,
    renderCell: (params) => {
      return (
        <div className='flex jstify-center items-center space-x-2 h-full pt-2'>
          <button
            onClick={() => handleEdit(params.row)}
            className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
              <FaEdit className='mr-2'/>
              Ažuriraj
          </button>
          <button
            onClick={() => handleImageUpload(params.row)}
            className='flex items-center bg-green-500 text-white px-4 h-9 rounded-md'>
              <FaImage className='mr-2'/>
              Fotografija
          </button>
          
          <button
            onClick={() => handlePerformanceView(params.row)}
            className='flex items-center bg-slate-800 text-white px-4 h-9 rounded-md'>
              <FaEye className='mr-2'/>
              Prikaži
          </button>
          {params.row.status === "DRAFT" && (
            <button
              onClick={() => handleDelete(params.row)}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 h-9 rounded-md"
            >
              <FaTrash className="mr-2" />
              Obriši
            </button>
          )}
        </div>
      )
    }
  },
];

export const adminOrderTableColumn = (handleEdit) => [
  // { 
  //   sortable: false,
  //   disableColumnMenu: true,
  //   field: "id",
  //   headerName: "orderId",
  //   width: 180,
  //   headerAlign: "center",
  //   editable: false,
  //   headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
  //   cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
  //   renderHeader: (params) => <span  className='text-center'>Order ID</span>
  //  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    width: 250,
    headerAlign: "center",
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Email</span>
   },
  
  {
    sortable: false,
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    width: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Ukupni Iznos (€)</span>,
    valueFormatter: (value) =>
        value == null ? "" : Number(value).toFixed(2),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    width: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Status</span>
  },
  { 
    sortable: false,
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    width: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderHeader: (params) => <span >Datum Rezervacije</span>,
    valueFormatter: (value) =>
        value
            ? new Date(value).toLocaleString("hr-HR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "",
  },
  // {
  //   sortable: false,
  //   field: "action",
  //   headerName: "Action",
  //   width: 250,
  //   headerAlign: "center",
  //   editable: false,
  //   headerClassName: "text-black font-semibold text-center ",
  //   cellClassName: "text-slate-700 font-normal r",
  //   renderHeader: (params) => <span >Action</span>,
  //   renderCell: (params) => {
  //     return (
  //       <div className='flex jstify-center items-center space-x-2 h-full pt-2'>
  //         <button
  //         onClick={() => handleEdit(params.row)}
  //           className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
  //             <FaEdit className='mr-2'/>
  //             Edit
  //         </button>
  //       </div>
  //     )
  //   }
  // },

  
];


export const adminUserTableColumn = (handleViewOrders, handleDeleteUser) => [
  
    {
        sortable: false,
        disableColumnMenu: true,
        field: "userName",
        headerName: "Korisničko ime",
        flex: 1,
        minWidth: 150,
        headerAlign: "center",
        align: "center",
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "email",
        headerName: "E-mail adresa",
        flex: 1.5,
        minWidth: 220,
        headerAlign: "center",
        align: "center",
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "emailVerified",
        headerName: "Verifikacija",
        flex: 1,
        minWidth: 130,
        headerAlign: "center",
        align: "center",
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
        renderCell: (params) => (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    params.value
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}
            >
                {params.value ? "Verificiran" : "Nije verificiran"}
            </span>
        ),
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "roles",
        headerName: "Uloga",
        flex: 1,
        minWidth: 130,
        headerAlign: "center",
        align: "center",
        headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
        cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
        renderCell: (params) => {
            const roleNames = {
                ROLE_USER: "Korisnik",
                ROLE_ADMIN: "Administrator",
                ROLE_SELLER: "Prodavač",
            };

            return (
                <span>
                    {(params.value || [])
                        .map((role) => roleNames[role] || role)
                        .join(", ")}
                </span>
            );
        },
    },
    
{
    sortable: false,
    disableColumnMenu: true,
    field: "actions",
    headerName: "Radnje",
    flex: 1,
    minWidth: 280,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold !border !border-gray-300 !text-center",
    cellClassName: "text-slate-700 font-normal !border !border-gray-300 !text-center",
    renderCell: (params) => (
        <div className="flex items-center justify-center gap-2 h-full">

            <button
                onClick={() =>
                    handleViewOrders(params.row.id, params.row.userName)
                }
                className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
            >
                <FaEye className="mr-2" />
                Rezervacije
            </button>

            {/* {!params.row.emailVerified && (
                <button
                    onClick={() =>
                        handleDeleteUser(params.row.id, params.row.userName)
                    }
                    className="flex items-center bg-red-500 text-white px-4 h-9 rounded-md"
                >
                    <FaTrash className="mr-2" />
                    Obriši
                </button>
            )} */}

        </div>
    ),
},

  
];