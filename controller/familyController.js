
const familyModel = require( '../model/familyModel' );
const fs = require('fs');


//get all profiles
const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familyModel.find();
        if ( profiles.length === 0 ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                message: "Profiles",
                data: profiles,
                totalProfile: profiles.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}
//get a profile
const getProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        if ( !profile) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// updating profile
const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        const { fatherName, motherName, children } = req.body;
        const bodyData = {
            fatherName: fatherName || profile.fatherName,
            motherName: motherName || profile.motherName,
            children: children || profile.children,
            childrenImage: profile.childrenImage
        }

        if ( req.files && req.files[ "childrenImage" ] ) {

            const oldChildrenImagePath = `uploads/${ profile.childrenImage }`
            if ( fs.existsSync( oldChildrenImagePath ) ) {
                fs.unlinkSync(oldChildrenImagePath)
            }
            bodyData.childrenImage = req.files.childrenImage.filename;
        }
        const newChildrenImage = await familyModel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newChildrenImage ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newChildrenImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// deleting a profile
const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
            const oldChildrenImagePath = `uploads/${ profile.profileImage }`
            if ( fs.existsSync( oldChildrenImagePath ) ) {
                fs.unlinkSync( oldChildrenImagePath )
            }
        const deletedProfile = await familyModel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


    

const createFamily = async (req, res) => {
        const { fatherName, motherName, children } = req.body;
        const filenames = req.files["childrenImage"].map((file) => file.filename);
      
        const family = new familyModel({
          fatherName,
          motherName,
          children,
          childrenImage: filenames,
        })
    try {
        const savedFamily = await family.save();
        if ( !savedFamily ) {
            res.status( 400 ).json( {
                message: "Family profile was not saved."
            })
        } else {
            res.status( 201 ).json( {
                message: "Family profile created successfully",
                data: savedFamily
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

module.exports={
    createFamily,
    getProfile,
    getProfiles,
    deleteProfile,
    updateProfile

}
