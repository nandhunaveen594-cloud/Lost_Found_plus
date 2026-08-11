import Item from '../../models/Item.js'

const getAllItems = async (req, res) => {
    try {
        const { type, category, status, search } = req.query
        let query = {}

        if (type) {
            query.type = new RegExp(`^${type}$`, 'i')
        }
        if (category) {
            query.category = new RegExp(`^${category}$`, 'i')
        }
        if (status) {
            query.status = status
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        }

        const items = await Item.find(query)
            .populate({
                path: 'userId',
                select: '_id nickname fullname img email',
            })
            .sort({ createdAt: -1 })

        return res.status(200).json({ ok: true, items })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred, contact with admin',
        })
    }
}

export default getAllItems

