
const express = require( 'express' );
const router = express.Router();
const { createFamily,getProfile,getProfiles,deleteProfile ,updateProfile} = require( '../controller/familyController' )
const upload = require('../utils/multer')


router.post( '/profiles', upload.fields( [ { name: "childrenImage", maxCount: 4 } ] ), createFamily )
router.get( '/profiles/:id', getProfile);
router.get( '/profiles', getProfiles );
router.delete( '/profiles/:id', deleteProfile );
router.put( '/profiles/:id', upload.fields( [ { name: "childrenImage", maxCount: 4} ] ), updateProfile );






module.exports = router;