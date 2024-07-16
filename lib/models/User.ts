import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email_addresses: [
    {
      email_address: String,
      id: String,
      object: String
    }
  ],
  first_name: String,
  last_name: String,
  last_sign_in_at: BigInt,
  image_url: String,
  object: String,
  profile_image_url: String,
  created_at: BigInt,
  updated_at: BigInt,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;