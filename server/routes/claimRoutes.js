import express from 'express';
import { validateJWT } from '../middlewares/validateToken.js';
import createClaim from '../controllers/Claims/createClaim.js';
import getMyClaims from '../controllers/Claims/getMyClaims.js';
import getItemClaims from '../controllers/Claims/getItemClaims.js';
import updateClaimStatus from '../controllers/Claims/updateClaimStatus.js';

const router = express.Router();

// Authenticated endpoints
router.post('/newClaim', validateJWT, createClaim);
router.post('/', validateJWT, createClaim);

router.get('/my-claims', validateJWT, getMyClaims);
router.get('/user', validateJWT, getMyClaims);

router.get('/item/:itemId', validateJWT, getItemClaims);

router.put('/:claimId', validateJWT, updateClaimStatus);
router.patch('/:claimId', validateJWT, updateClaimStatus);

export default router;
