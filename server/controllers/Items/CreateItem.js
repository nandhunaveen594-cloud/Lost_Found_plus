import Item from '../../models/Item.js'

const createItem = async (req, res) => {
    try {
        const itemData = { ...req.body }
        
        // Attach authenticated user ID if available from validateJWT middleware
        if (req.id) {
            itemData.userId = req.id
        }

        // Support both title and name
        if (itemData.title && !itemData.name) {
            itemData.name = itemData.title
        } else if (itemData.name && !itemData.title) {
            itemData.title = itemData.name
        }

        if (!itemData.userId) {
            return res.status(400).json({
                ok: false,
                msg: 'User ID is required',
            })
        }

        const newItem = new Item(itemData)
        if (req.file) {
            newItem.img = [req.file.path]
        }

        const savedItem = await newItem.save()
        return res.status(201).json({
            ok: true,
            msg: 'Item Created',
            item: savedItem,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error.message || 'An error occurred, contact with admin',
        })
    }
}

export default createItem

