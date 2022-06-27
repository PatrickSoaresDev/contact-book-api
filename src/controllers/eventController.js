const { Op } = require('sequelize')
const db = require('../models')
const DBEvents = db.events
const DBContacts = db.contact

eventPagination = async (req, res) => {
  let { limit, page, search = '' } = req.query
  const offset = parseInt(limit) * (page - 1)
  try {
    const events = await DBEvents.findAndCountAll({
      where: [{ name: { [Op.like]: `%${search}%` } }],
      limit: parseInt(limit),
      offset,
    })
    return res.status(201).json(events)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

createEvent = async (req, res) => {
  try {
    await DBEvents.create(req.body)
    return res.status(201)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

findAll = async (req, res) => {
  try {
    const events = await DBEvents.findAll({
      include: [{ model: DBContacts, as: 'contacts' }],
    })
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

findById = async (req, res) => {
  const { id } = req.params
  try {
    const event = await DBEvents.findOne({
      where: {
        id: +id,
      },
      include: [{ model: DBContacts, as: 'contacts' }],
    })
    return res.status(200).json(event)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

updateEvent = async (req, res) => {
  const { contacts, ...data } = req.body
  const event = await DBEvents.findOne({
    where: { id: req.params.id },
  })
  try {
    if (contacts) {
      event.setContatos(contacts)
    }
    await DBEvents.update(data, {
      where: {
        id: req.params.id,
      },
    })
    return res.status(204).json('Resource updated successfully')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

deleteEvent = async (req, res) => {
  const { id } = req.params
  try {
    await DBEvents.destroy({
      where: {
        id: +id,
      },
    })
    return res.status(200).json(`Resource deleted successfully`)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}
const eventController = {
  eventPagination,
  createEvent,
  findAll,
  findById,
  updateEvent,
  deleteEvent,
}

module.exports = eventController
