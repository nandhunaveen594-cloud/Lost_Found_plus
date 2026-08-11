import Claim from '../../models/Claim.js';
import Item from '../../models/Item.js';

const getItemClaims = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.id; // from validateJWT middleware

        // 1. Verify item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: "Item doesn't exist",
            });
        }

        // 2. Ownership check: Only item owner can view claims for this item
        if (item.userId.toString() !== userId) {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized: Only item owner can view claims',
            });
        }

        // 3. Retrieve claims for this item
        const claims = await Claim.find({ itemId })
            .populate({
                path: 'userId',
                select: '_id nickname fullname email img',
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            ok: true,
            claims,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred while fetching item claims',
        });
    }
};

export default getItemClaims;
