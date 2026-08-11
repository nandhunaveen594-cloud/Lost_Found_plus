import Claim from '../../models/Claim.js';
import Item from '../../models/Item.js';

const updateClaimStatus = async (req, res) => {
    try {
        const { claimId } = req.params;
        const { status } = req.body;
        const userId = req.id; // from validateJWT middleware

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                ok: false,
                msg: "Status must be 'approved' or 'rejected'",
            });
        }

        // 1. Find claim and populate associated item
        const claim = await Claim.findById(claimId).populate('itemId');
        if (!claim) {
            return res.status(404).json({
                ok: false,
                msg: "Claim doesn't exist",
            });
        }

        // 2. Ownership check: Only item owner can approve or reject claim
        if (claim.itemId.userId.toString() !== userId) {
            return res.status(403).json({
                ok: false,
                msg: 'Unauthorized: Only item owner can update claim status',
            });
        }

        // 3. Update claim status
        claim.status = status;
        const updatedClaim = await claim.save();

        // 4. When a claim is approved, mark the item as claimed/resolved
        if (status === 'approved') {
            await Item.findByIdAndUpdate(claim.itemId._id, {
                status: 'claimed',
            });
        }

        return res.status(200).json({
            ok: true,
            msg: `Claim ${status}`,
            claim: updatedClaim,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'An error occurred while updating claim status',
        });
    }
};

export default updateClaimStatus;
