import express from 'express'
import createItem from '../controllers/Items/CreateItem.js'
import { validateJWT } from '../middlewares/validateToken.js'
import getAllItems from '../controllers/Items/getAllItems.js'
import getItemById from '../controllers/Items/getItemById.js'
import updateItem from '../controllers/Items/updateItem.js'
import deleteItem from '../controllers/Items/deleteItem.js'

const router = express.Router()

router.post('/newItem', validateJWT, createItem)
router.post('/', validateJWT, createItem)

router.get('/', getAllItems)
router.get('/:id', getItemById)

router.put('/update/:id', validateJWT, updateItem)
router.put('/:id', validateJWT, updateItem)

router.delete('/delete/:id', validateJWT, deleteItem)
router.delete('/:id', validateJWT, deleteItem)

export default router

