import { Button, Stack, TextField } from "@mui/material";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import PlaceOrderService from "./PlaceOrderService";
import { useNavigate, useParams } from "react-router-dom";
import VendorService from "../PurchaseService/VendorService";

const PurchaseOrderMailForm = () => {
  const { purchaseid } = useParams();

  const [emailData, setEmailData] = useState("");
  const [vendor, setVendor] = useState("");

  const nav = useNavigate();
  const handleCancel = () => {
    nav("/admin/purchase");
  };
  const editor = useRef(null);
  const [content, setContent] = useState(
    `<html>
    <body>
      <p>Dear ${emailData.vendoruniquename},</p>
      <p>The purchase order (Purchase ID: ${emailData.purchaseid}). is attached with this email. Here is the overview of order:</p>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Categories</th>
          <th>Buy Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Tax</th>
          <th>Tax Amount</th>
          <th>Total</th>
        </tr>
        <tr>
          <td>${emailData.productname}</td>
          <td>${emailData.categories}</td>
          <td>${emailData.buyprice}</td>
          <td>${emailData.quantity}</td>
          <td>${emailData.subtotal}</td>
          <td>${emailData.tax}</td>
          <td>${emailData.taxamount}</td>
          <td>${emailData.total}</td>
        </tr>
      </table>
      <p> Please go through it and confirm the order. We look forward to working with you again </p>
      <p>Please note that the expected delivery date is ${emailData.expectdate}. If you have any further questions or concerns, please feel free to contact us.</p>
      <p>Best regards,<br>Stock Control System</p>
    </body>
  </html>`
  );

  console.log(purchaseid);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await PlaceOrderService.getPurchaseDetailsById(purchaseid);
        const vendorRes = await VendorService.getVendorDetailsByDisplayName(
          res.data.vendoruniquename
        );

        setVendor(vendorRes.data);

        setEmailData(res.data);

        setContent(`<html>
        <body>
          <p>Dear ${res.data.vendoruniquename},</p>
          <p>The purchase order (Purchase ID: ${res.data.purchaseid}). is attached with this email. Here is the overview of order:</p>
          <table>
            <tr>
              <th>Product Name</th>
              <th>Categories</th>
              <th>Buy Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Tax</th>
              <th>Tax Amount</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>${res.data.productname}</td>
              <td>${res.data.categories}</td>
              <td>${res.data.buyprice}</td>
              <td>${res.data.quantity}</td>
              <td>${res.data.subtotal}</td>
              <td>${res.data.tax}</td>
              <td>${res.data.taxamount}</td>
              <td>${res.data.total}</td>
            </tr>
          </table>
          <p> Please go through it and confirm the order. We look forward to working with you again </p>
          <p>Please note that the expected delivery date is ${res.data.expectdate}. If you have any further questions or concerns, please feel free to contact us.</p>
          <p>Best regards,<br>Stock Control System</p>
        </body>
      </html>`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [purchaseid]);

  function sendEmailData(e) {
    e.stopPropagation();
    let data = {
      from: "kunaldhavle9@gmail.com",
      to: vendor.email,
      subject:
        "Purchase Order Confirmation - Purchase ID:" + emailData.purchaseid,
      purchaseid: emailData.purchaseid,
      content: content,
      mailsend: true,
    };

    PlaceOrderService.sendEmailData(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    nav("/admin/purchase");

    PlaceOrderService.updateOrderStatus(emailData.purchaseid, "ORDERED")
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form style={{ width: "100%" }}>
      <div className="mailbox">
        <label htmlFor="" className="mailboxlabel">
          From&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          fullWidth
          value={"kunaldhavle9@gmail.com"}
        />
      </div>
      <div className="mailbox">
        <label htmlFor="" className="mailboxlabel">
          To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          fullWidth
          value={vendor.email}
        />
      </div>
      <div className="mailbox">
        <label htmlFor="" className="mailboxlabel">
          Subject
        </label>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          fullWidth
          value={
            "Purchase Order Confirmation - Purchase ID:" + emailData.purchaseid
          }
        />
      </div>

      <br />
      <div className="mailboxeditor">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <Stack direction="row" spacing={4}>
        <Button variant="contained" color="success" onClick={sendEmailData}>
          Send
        </Button>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
      <br />
    </form>
  );
};

export default PurchaseOrderMailForm;
