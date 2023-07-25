import * as Yup from "yup";

export const productSchema = Yup.object({
  receieveItem: Yup.string().required("Received ID is required"),

  brand: Yup.string().required("Brand is required"),

  about: Yup.string().required("About is required"),
  title: Yup.string().required("Title ID is required").max(50),
  buyprice: Yup.number().required("Cost Price is required"),
  sellingPrice: Yup.number().required("Selling Price is required").min(1),
  quantity: 0,
  minimumQuantityAlert: Yup.number().required(
    "Minimum Quantity Alert is required"
  ),
  autoReorderEnabled: Yup.string(),
  length: Yup.number().required(),
  breadth: Yup.number().required(),
  height: Yup.number().required(),
  volume: Yup.number().required(),
  image: Yup.mixed().required("Image is required"),
});
