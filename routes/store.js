const express = require('express');
const router = express.Router();

//load the controllers
const {getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
    } = require('../controllers/store')


//route here
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)


//export
module.exports = router;