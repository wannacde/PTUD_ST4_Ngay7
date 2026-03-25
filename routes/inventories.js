var express = require('express');
var router = express.Router();
let inventoryModel = require('../schemas/inventories')

router.get('/', async function (req, res, next) {
  let data = await inventoryModel.find({}).populate('product')
  res.send(data)
})

router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await inventoryModel.findById(id).populate('product')
    if (result) {
      res.send(result)
    } else {
      res.status(404).send('ID NOT FOUND')
    }
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/add-stock', async function (req, res, next) {
  try {
    let product = req.body.product
    let quantity = Number(req.body.quantity)

    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).send({ message: 'product and quantity > 0 are required' })
    }

    let result = await inventoryModel.findOneAndUpdate(
      { product: product },
      { $inc: { stock: quantity } },
      { new: true }
    ).populate('product')

    if (!result) {
      return res.status(404).send({ message: 'inventory not found for product' })
    }

    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post('/remove-stock', async function (req, res, next) {
  try {
    let product = req.body.product
    let quantity = Number(req.body.quantity)

    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).send({ message: 'product and quantity > 0 are required' })
    }

    let result = await inventoryModel.findOneAndUpdate(
      { product: product, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    ).populate('product')

    if (!result) {
      return res.status(400).send({ message: 'inventory not found or insufficient stock' })
    }

    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post('/reservation', async function (req, res, next) {
  try {
    let product = req.body.product
    let quantity = Number(req.body.quantity)

    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).send({ message: 'product and quantity > 0 are required' })
    }

    let result = await inventoryModel.findOneAndUpdate(
      { product: product, stock: { $gte: quantity } },
      { $inc: { stock: -quantity, reserved: quantity } },
      { new: true }
    ).populate('product')

    if (!result) {
      return res.status(400).send({ message: 'inventory not found or insufficient stock' })
    }

    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post('/sold', async function (req, res, next) {
  try {
    let product = req.body.product
    let quantity = Number(req.body.quantity)

    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).send({ message: 'product and quantity > 0 are required' })
    }

    let result = await inventoryModel.findOneAndUpdate(
      { product: product, reserved: { $gte: quantity } },
      { $inc: { reserved: -quantity, soldCount: quantity } },
      { new: true }
    ).populate('product')

    if (!result) {
      return res.status(400).send({ message: 'inventory not found or insufficient reserved quantity' })
    }

    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

module.exports = router;
