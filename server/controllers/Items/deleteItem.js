import Item from '../../models/Item.js' 

const deleteItem = async (req, res) => {
    const { id } = req.params      
    
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
                msg: 'Unauthorized: You can only delete your own items',
            })
        }

        await Item.findByIdAndDelete(id)

        return res.status(200).json({ item, ok: true, msg: 'Item deleted' })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred, contact with admin',
        })
    } 
} 

export default deleteItem