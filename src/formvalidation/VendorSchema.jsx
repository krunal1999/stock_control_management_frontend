import * as Yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const vendorSchema = Yup.object({
  firstname: Yup.string().min(2).max(15).required("Please Enter Firstname"),
  lastname: Yup.string().min(1).max(15).required("Please Enter lastname"),
  vendoruniquename: Yup.string()
    .min(2)
    .max(15)
    .required("Please Enter DisplayName"),
  phonenumber: Yup.string().min(10).max(13),
  email: Yup.string().matches(emailRegex, "Please Enter a valid email").required("Please Enter email"),
  location: Yup.string().min(2).max(50).required("Please Enter location"),
  country: Yup.string().min(2).max(50).required("Please Enter country name"),
});
