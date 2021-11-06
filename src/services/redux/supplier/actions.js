import { createActions} from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchSuppliers: ["query"],
    fetchSuppliersSuccess: ["responseData"],
    fetchSuppliersFailure: ["error"],

    createSupplier: ["payload"],
    createSupplierSuccess: ["responsedata"],
    createSupplierFailure: ["error"],

    updateSupplier: ["supplierId", "payload"],
    updateSupplierSuccess: ["responseData"],
    updateSupplierFailure: ["error"],

    deleteSupplier: ["supplierId"],
    deleteSupplierSuccess: ["supplierId"],
    deleteSupplierFailure: ["error"],

    getSupplier: ["supplierId"],
    getSupplierSuccess: ["supplierId"],
    getSupplierFailure: ["error"],

    setSelectedSuppliers: ["suppliers"],
    filterSuppliers: ["search"],

    resetSuppliers: null
  }
)