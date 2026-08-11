import Claim from '../../models/Claim.js';

const getMyClaims = async (req, res) => {
    try {
        const userId = req.id; // from validateJWT middleware

        const claims = await Claim.find({ userId })
            .populate({
                path: 'itemId',
                select: 'title name description category type location date img status userId',
                populate: {
                    path: 'userId',
                    select: '_id nickname fullname email img',
                },
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
            msg: 'An error occurred while fetching your claims',
        });
    }
};

export default getMyClaims;
