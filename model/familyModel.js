// const mongoose = require( 'mongoose' );

// const familySchema = new mongoose.Schema( {
//    fathername:{
//     type:String,
//     required:true,
//    },
//    mothername:{
//     type:String,
//     required:true,
//    },
//    children:{
//     type:String,
//     required:true,
//    },
//    childrenImage:[{
//     type:String,
//     required:true
//    }]
// }, { timestamps: true } );

// const family = mongoose.model( "family", familySchema );

// module.exports = family;
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema( {
  fatherName: {
      type: String,
      require: true,
      unique:true
  },
  motherName: {
      type: String,
      required: true
  },
  children: {
      type: String,
      required: true
  },
  childrenImage: [{
      type: String,
      required: true
  }]
}, { timestamps: true } );

const Family = mongoose.model('Family', familySchema);

module.exports = Family;

