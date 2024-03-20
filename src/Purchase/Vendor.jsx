import { Button, Grid, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import VendorList from "./VendorList";
import AdminLayout from "../layouts/AdminLayout";
import StatusCards from "../componets/StatusCards";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useEffect, useState } from "react";
import VendorService from "./PurchaseService/VendorService";

const Vendor = () => {
  const [updateDone, setUpdateDone] = useState(false);
  const [deleteDone, setDeleteDone] = useState(false);

  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/purchase/addvendor");
  }

  const rows = [];
  const [vendor, setVendor] = useState([]);
  let totalVendors = 0;
  let activeVendors = 0;
  let inactiveVendors = 0;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await VendorService.getVendor();
        setVendor(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, [updateDone, deleteDone]);

  vendor.forEach((v) => {
    rows.unshift(v);
    totalVendors++;
    if (v.activestatus === "ACTIVE") {
      activeVendors++;
    } else {
      inactiveVendors++;
    }
  });

  // change the status-------------
  const [changeStatusId, setChangestatusId] = useState(null);

  const changeStatus = (id) => {
    setChangestatusId(id);
    setUpdateDone(true);
  };

  useEffect(() => {
    if (updateDone) {
      VendorService.updateVendorStatus(changeStatusId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setUpdateDone(false);
  }, [changeStatusId, updateDone]);

  // change the status-------------

  // delete vendor -------------

  const [deleteVendorID, setDeleteVendorID] = useState(null);

  const deleteVendor = (id) => {
    setDeleteVendorID(id);
    setDeleteDone(true);
  };

  useEffect(() => {
    if (deleteDone) {
      VendorService.deleteVendor(deleteVendorID)
        .then((response) => {
          console.log(response);
          setUpdateDone(false);
          setUpdateDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [deleteVendorID, deleteDone]);

  // delete vendor -------------

  return (
    <>
      <AdminLayout>
        <Stack direction="row" spacing={6} width={1200}>
          <StatusCards
            title="Total Vendor"
            value={totalVendors}
            maxvalue={totalVendors}
            cardcolor="#f4cccc"
            icon={
              <Groups2Icon sx={{ width: 40, height: 40, color: "#133467" }} />
            }
            pathcolour="#133467"
          />
          <StatusCards
            title="Active Vendor"
            value={activeVendors}
            maxvalue={totalVendors}
            cardcolor="#ace1af"
            icon={
              <RecordVoiceOverIcon
                sx={{ width: 40, height: 40, color: "#007b5e" }}
              />
            }
            pathcolour="#007b5e"
          />
          <StatusCards
            title="Inactive Vendor"
            value={inactiveVendors}
            maxvalue={totalVendors}
            cardcolor="#de6fa1"
            icon={
              <PersonOffIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
            }
            pathcolour="#cc2400"
          />
        </Stack>
        <br />
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  Add Vendor
                </Button>
              </div>
            </Paper>
          </Grid>

         

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <VendorList
                rows={rows}
                onChangeStatus={changeStatus}
                ondelete={deleteVendor}
              />
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default Vendor;
