const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    //required: true,
    //minlength: 6,
  },
  avatar: {
    type: String,
    default: '', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to compare the password entered by the user during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// // Method to generate a JWT token for the user
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id.toString() }, 'your_jwt_secret_key');
//   return token;
// };
const User = mongoose.model('User', userSchema);

module.exports = User;
