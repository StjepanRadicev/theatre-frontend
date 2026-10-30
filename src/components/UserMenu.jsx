import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { BackDrop } from "./BackDrop";
import { logOutUser } from "../store/actions";



const UserMenu = () => {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

  const username = auth.username || auth.userName || "";
  const isAdmin = auth.roles?.some(
      (role) => role === "ROLE_ADMIN" || role?.name === "ROLE_ADMIN"
  );

  const logoutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src=""/>
      </div>

      <Menu
        sx={{ width:"400px" }}
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
            sx: {width: 160},
          },
        }}
      >
      {isAdmin ? (
          <Link to="/admin">
              <MenuItem className="flex gap-2" onClick={handleClose}>
                  <BiUser className="text-xl" />
                  <span className="font-bold text-[16px] mt-1">
                      {username}
                  </span>
              </MenuItem>
          </Link>
      ) : (
          <MenuItem className="flex gap-2" onClick={handleClose}>
              <BiUser className="text-xl" />
              <span className="font-bold text-[16px] mt-1">
                  {username}
              </span>
          </MenuItem>
      )}

        {/* <Link to="/profile/orders">
            <MenuItem className="flex gap-2" 
                      onClick={handleClose}>
                <FaShoppingCart className="text-xl"/>
                <span className="font-semibold ">
                    Order
                </span>
            </MenuItem>
        </Link> */}

        
            <MenuItem className="flex gap-2" 
                      onClick={logoutHandler}>
                <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
                    <IoExitOutline className="text-xl"/>
                    <span className="font-bold text-[16px] mt-1">
                        Odjava
                    </span>
                </div>
            </MenuItem>
        
      </Menu>

      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu;