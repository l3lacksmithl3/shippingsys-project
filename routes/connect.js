var mongoose = require('mongoose');
mongoose.connect('mongodb://10.200.90.152:27017/AMT_Shipping', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;