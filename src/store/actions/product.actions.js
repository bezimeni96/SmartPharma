import { productConstants } from "../constants/product.constants";

export const addProduct = (product) => ({
  type: productConstants.ADD_PRODUCT,
  payload: product,
});

export const editProduct = (product) => ({
  type: productConstants.EDIT_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: productConstants.REMOVE_PRODUCT,
  payload: productId,
});

export const setEditProduct = (product) => ({
  type: productConstants.SET_EDIT_PRODUCT,
  payload: product,
});
