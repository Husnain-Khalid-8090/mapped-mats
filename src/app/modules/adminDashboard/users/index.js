import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent, Select } from "@mui/material";
import Filter from "../../../assets/images/cil_filter.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import dashboard, {

//     getAdminCompanies,

// } from '../services';
const options = ["Verified", "Not Verified", "Rejected"];
const data = [
  {
    id: 1,
    company_name: "WebEvis",
    country: "Pakistan",
    department: "DevOps",
    status: "Verified",
  },
  {
    id: 2,
    company_name: "Pure Logics",
    country: "Pakistan",
    department: "Quality Assurance",
    status: "Not Verified",
  },
  {
    id: 3,
    company_name: "NextBridge",
    country: "Pakistan",
    department: "UiUx",
    status: "Verified",
  },
  {
    id: 4,
    company_name: "Techlogix",
    country: "Pakistan",
    department: "Accounts",
    status: "Rejected",
  },
  {
    id: 5,
    company_name: "Arbisoft",
    country: "Pakistan",
    department: "Full Stack",
    status: "Verified",
  },
];
// const columns = [
//     {field: 'id', headerName: 'ID', width: 70},
//     {field: 'firstName', headerName: 'First name', width: 130},
//     {field: 'lastName', headerName: 'Last name', width: 130},
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "company_name", headerName: "Company", width: 130 },
  { field: "country", headerName: "Country", width: 130 },
  { field: "department", headerName: "Department", width: 130 },

  { field: "status", headerName: "Status", width: 130 },
];

const rows = data.map((row) => {
  return {
    id: row.id,
    company_name: row.company_name,
    country: row.country,
    department: row.department,
    status: row.status,
  };
});

export const Users = () => {
  const dispatch = useDispatch();
//   const response = useSelector(
//     (state) => state?.dashboard?.adminCompanies?.response
//   );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(2);
  // const [state, setState] = useState({
  //   companies: response,
  // });

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(getAdminCompanies("", "", ""));
//   }, []);

//   useEffect(() => {
//     setState({ ...state, companies: response });
//   }, [response]);

  const handlePageChange = (newPage) => {
    debugger;
    setPage(newPage);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 2));
    setPage(0);
  };
  const menuClicked = (e, value) => {
    setStatus(value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = (e) => {
    setStatus(e.target.innerText);
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <Card>
      <ToastContainer autoClose={2000} />
      <CardContent>
        <Toolbar disableGutters>
          <Typography variant="h5" sx={{ flex: "1 1 100%" }}>
            Companies List
          </Typography>
          <Button
            variant="contained"
            className="containedDefault"
            startIcon={<img src={Filter} />}
            endIcon={<ExpandMoreOutlinedIcon />}
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ marginRight: "30px" }}
          >
            Filters
          </Button>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => console.log(e.target.value, "asdasdas")}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onChange={menuClicked}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={status} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>

        <Box sx={{ height: "450px", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            page={page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            rowsPerPageOptions={[2]}
            filterModel={{
              items: [
                {
                  columnField: "status",
                  operatorValue: "equals",
                  value: status,
                },
              ],
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            filterMode="client"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Users;
