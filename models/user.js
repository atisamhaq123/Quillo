const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AuthSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    role: { type: String, default: "writer" } // 👈 properly defined
  },
  { timestamps: true }
);

// Hash password before saving
AuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with stored hash
AuthSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", AuthSchema);
