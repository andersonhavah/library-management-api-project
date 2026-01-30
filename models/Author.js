const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
      trim: true,
      maxlength: [50, 'Last name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot be more than 1000 characters']
    },
    birthDate: {
      type: Date
    },
    nationality: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    }
  },
  {
    timestamps: true
  }
);

// Virtual for full name
authorSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Author', authorSchema);