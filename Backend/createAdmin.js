require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
    try {
        // check if admin already exists
        const existing = await User.findOne({ email: "lakshyakumar1508@gmail.com" });
        if (existing) {
            console.log("⚠️ Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Lakshya@7903", 10);

        const admin = new User({
            name: "lakshya",
            email: "lakshyakumar1508@gmail.com",
            password: hashedPassword, // ✅ FIXED
            role: "admin",
        });

        await admin.save();
        console.log("✅ Admin created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();