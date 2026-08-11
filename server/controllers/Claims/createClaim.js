import Claim from '../../models/Claim.js';
import Item from '../../models/Item.js';

const createClaim = async (req, res) => {
    try {
        const { itemId, message } = req.body;
        const userId = req.id; // from validateJWT middleware

        if (!itemId) {
            return res.status(400).json({
                ok: false,
                msg: 'itemId is required',
            });
        }

        // 1. Check if item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: "Item doesn't exist",
            });
        }

        // 2. Prevent user from claiming their own item
        if (item.userId.toString() === userId) {
            return res.status(400).json({
                ok: false,
                msg: 'You cannot claim your own item',
            });
        }

        // 3. Prevent duplicate pending claims by the same user for the same item
        const existingClaim = await Claim.findOne({
            itemId,
            userId,
            status: 'pending',
        });

        if (existingClaim) {
            return res.status(400).json({
                ok: false,
                msg: 'You already have a pending claim for this item',
            });
        }

        // 4. Create new claim
        const newClaim = new Claim({
            itemId,
            userId,
            message: message || '',
            status: 'pending',
        });

        const savedClaim = await newClaim.save();

        return res.status(201).json({
            ok: true,
            msg: 'Claim submitted successfully',
            claim: savedClaim,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message || 'An error occurred while creating claim',
        });
    }
};

export default createClaim;
