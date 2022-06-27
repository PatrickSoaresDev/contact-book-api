const express = require('express')
const router = express.Router()
const ContatoController = require('../controllers/contactController')

router.get('/contacts', ContatoController.findAll)
router.get('/contacts/pagination', ContatoController.contactPagination)
router.get('/contacts/:id', ContatoController.findById)
router.post('/contacts', ContatoController.createContact)
router.put('/contacts/:id', ContatoController.updateContact)
router.delete('/contacts/:id', ContatoController.deleteContact)

module.exports = router
