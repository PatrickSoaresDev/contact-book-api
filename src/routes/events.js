const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.get('/events', eventController.findAll)
router.get('/events/pagination', eventController.eventPagination)
router.get('/events/:id', eventController.findById)
router.post('/events', eventController.createEvent)
router.put('/events/:id', eventController.updateEvent)
router.delete('/events/:id', eventController.deleteEvent)

module.exports = router
