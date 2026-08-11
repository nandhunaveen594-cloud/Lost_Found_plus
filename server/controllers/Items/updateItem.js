import Item from '../../models/Item.js'

const updateItem = async (req, res) => {
    const { id } = req.params
    const newData = { ...req.body }

    try {
        const item = await Item.findById(id)

        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: "Item doesn't exist",
            })
        }

        // Ownership protection check
        if (req.id && item.userId.toString() !== req.id) {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized: You can only update your own items',
            })
        }

        if (newData.title && !newData.name) {
            newData.name = newData.title
        } else if (newData.name && !newData.title) {
            newData.title = newData.name
        }

        const itemUpdated = await Item.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true,
        }).populate({
            path: 'userId',
            select: '_id nickname fullname img email',
        })

        return res.status(200).json({
            ok: true,
            msg: 'Item Updated!',
            itemUpdated,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred, contact an administrator',
        })
    }
}

export default updateItem

