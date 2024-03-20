import * as Yup from "yup";

export const productSchema = Yup.object({
  

  about: Yup.string().required("About is required"),
  title: Yup.string().required("Title ID is required").max(50),

  sellingPrice: Yup.string().required("Selling Price is required").min(1),

  minimumQuantityAlert: Yup.string().required(
    "Minimum Quantity Alert is required"
  ),
  autoReorderEnabled: Yup.string(),
  length: Yup.string().required(),
  breadth: Yup.string().required(),
  height: Yup.string().required(),

  image: Yup.mixed().required("Image is required"),
});
