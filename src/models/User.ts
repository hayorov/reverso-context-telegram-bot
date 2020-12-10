import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
  user_id: {
    required: true,
    type: String,
  },
  input_language: {
    required: true,
    type: String,
  },
  target_language: {
    required: true,
    type: String,
  },
})

const User = mongoose.model("User", userSchema)

export default User
