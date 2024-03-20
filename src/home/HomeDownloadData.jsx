import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AdminLayout from "../layouts/AdminLayout";
import HomeService from "./HomeService";

const HomeDownloadData = () => {
  const handleProductDataExcel = async () => {
    try {
      const res = await HomeService.getExcelProductData();

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `product_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExcelcategorydata = async () => {
    try {
      const res = await HomeService.getExcelcategorydata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Category_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExcelbilldata = async () => {
    try {
      const res = await HomeService.getExcelbilldata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Bills_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExcelordersuccessdata = async () => {
    try {
      const res = await HomeService.getExcelordersuccessdata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `OrderSuccess_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExcelpurchaseitemdata = async () => {
    try {
      const res = await HomeService.getExcelpurchaseitemdata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `PurchaseItem_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExcelvendordata = async () => {
    try {
      const res = await HomeService.getExcelvendordata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Vendor_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const getExceluserdata = async () => {
    try {
      const res = await HomeService.getExceluserdata();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `User_${dateString}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const categorycsvexport = async () => {
    try {
      const res = await HomeService.categorycsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Category_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };
  const ordersuccesscsvexport = async () => {
    try {
      const res = await HomeService.ordersuccesscsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `OrderSucess_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const billscsvexport = async () => {
    try {
      const res = await HomeService.billscsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Bills_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const purchasecsvexport = async () => {
    try {
      const res = await HomeService.purchasecsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Purchase_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const vendorcsvexport = async () => {
    try {
      const res = await HomeService.vendorcsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Vendor_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const usercsvexport = async () => {
    try {
      const res = await HomeService.usercsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `User_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  const productcsvexport = async () => {
    try {
      const res = await HomeService.productcsvexport();
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      const dateString = date.toISOString().replace(/:/g, "-");
      const filename = `Product_${dateString}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <AdminLayout>
      <br />
      <br />
      <br />
      <TableContainer component={Paper} sx={{ width: 800 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">EXCEL</TableCell>
              <TableCell align="center">CSV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={handleProductDataExcel}
                  variant="contained"
                  sx={{ bgcolor: "orange", width: 300 }}
                >
                  Download Product Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={productcsvexport}
                 variant="contained"
                 sx={{ bgcolor: "Green", width: 300 }}>
                  Download Product Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExcelcategorydata}
                  variant="contained"
                  sx={{ bgcolor: "green", width: 300 }}
                >
                  Download Category Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={categorycsvexport}
                variant="contained"
                sx={{ bgcolor: "blue", width: 300 }}>
                  Download Category Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExcelordersuccessdata}
                  variant="contained"
                  sx={{ bgcolor: "blue", width: 300 }}
                >
                  Download Orders Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={ordersuccesscsvexport}
                 variant="contained"
                 sx={{ bgcolor: "orange", width: 300 }}>
                  Download Order Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExcelbilldata}
                  variant="contained"
                  sx={{ bgcolor: "orange", width: 300 }}
                >
                  Download Bills Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={billscsvexport}
                variant="contained"
                sx={{ bgcolor: "green", width: 300 }}>
                  Download Bills Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExcelpurchaseitemdata}
                  variant="contained"
                  sx={{ bgcolor: "green", width: 300 }}
                >
                  Download Purchase Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={purchasecsvexport}
                variant="contained"
                sx={{ bgcolor: "blue", width: 300 }}>
                  
                  Download Purchase Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExcelvendordata}
                  variant="contained"
                  sx={{ bgcolor: "blue", width: 300 }}
                >
                  Download Vendor Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={vendorcsvexport}
                variant="contained"
                sx={{ bgcolor: "orange", width: 300 }}>
                  Download vendor Data
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={getExceluserdata}
                  variant="contained"
                  sx={{ bgcolor: "orange", width: 300 }}
                >
                  Download User Data
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={usercsvexport}
                variant="contained"
                sx={{ bgcolor: "green", width: 300 }}>
                  Download user Data
                </Button>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
};

export default HomeDownloadData;
