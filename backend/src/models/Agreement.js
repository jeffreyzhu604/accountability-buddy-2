/*
    Sources:
    - https://stackoverflow.com/questions/52867578/mongoose-date-schema

*/
const mongoose = require("mongoose");

const agreementSchema = mongoose.Schema({
    /*
        - Start date
        - End date
        - Amount
        - Description
        - Friend
    */
   startDate: {
       type: Date,
       default: Date.now
   },
   endDate: {
       type: Date,
       get: value => value.toDateString(),
       required: true
   },
   amount: {
       type: Number,
       required: true
   },
   description: {
       type: String,
       trim: true
   },
   friendID: {
       type: String,
       required: true
   },
   creatorID: {
       type: String,
       required: true
   }

});

const Agreement = mongoose.model("Agreement", agreementSchema);

module.exports = Agreement;