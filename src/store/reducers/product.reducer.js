import { productConstants } from "../constants/product.constants";

import dummyProducts from "../../config/dummyProducts";
import dummyManufacturers from "../../config/dummyManufacturers";

const initialState = {
  products: dummyProducts,
  manufacturers: dummyManufacturers,
  editProduct: undefined,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case productConstants.EDIT_PRODUCT:
      const newProducts = state.products;
      const index = newProducts.findIndex((el) => el.id === action.payload.id);
      newProducts[index] = action.payload;

      return {
        ...state,
        products: [...newProducts],
        editProduct: undefined,
      };
    case productConstants.REMOVE_PRODUCT:
      return {
        ...state,
        products: [...state.products].filter(
          (item) => item.id !== action.payload
        ),
      };
    case productConstants.SET_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
