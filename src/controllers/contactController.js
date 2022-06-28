const { Op } = require('sequelize')
const db = require('../models')
const DBContacts = db.contact
const DBEvent = db.events

contactPagination = async (req, res) => {
  let { limit, page, search = '' } = req.query

  const offset = parseInt(limit) * (page - 1)

  try {
    const contacts = await DBContacts.findAndCountAll({
      where: [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ],
      limit: parseInt(limit),
      offset,
    })
    return res.status(200).json(contacts)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

createContact = async (req, res) => {
  try {
    await DBContacts.create(req.body)
    return res.sendStatus(201)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

findAll = async (req, res) => {
  try {
    const contacts = await DBContacts.findAll({
      include: [{ model: DBEvent, as: 'events' }],
    })
    return res.json(contacts)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

findById = async (req, res) => {
  const { id } = req.params
  try {
    const contact = await DBContacts.findOne({
      where: {
        id: +id,
      },
      include: [{ model: DBEvent, as: 'events' }],
    })
    return res.status(200).json(contact)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

updateContact = async (req, res) => {
  const { id } = req.params
  try {
    await DBContacts.update(req.body, {
      where: {
        id: +id,
      },
    })
    return res.status(204).json('Resource updated successfully')
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

deleteContact = async (req, res) => {
  const { id } = req.params
  try {
    await DBContacts.destroy({
      where: {
        id: +id,
      },
    })
    return res.status(200).json('Resource deleted successfully')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
const contactController = {
  contactPagination,
  createContact,
  findAll,
  findById,
  updateContact,
  deleteContact,
}

module.exports = contactController
