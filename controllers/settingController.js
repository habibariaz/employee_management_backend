// import User from "../models/User.js";
// import bcrypt from 'bcrypt'

// export const changePassword = async (req, res) => {
//     try {
//         const { userId, oldPassword, newPassword } = req.body;
//         const user = await User.findById({ _id: userId })

//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not Found" })
//         }

//         const isMatch = await bcrypt.compare(oldPassword, newPassword)

//         if (!isMatch) {
//             return res.status(404).json({ success: false, error: "Wrong old Password" })
//         }

//         const hashPassword = await bcrypt.hash(newPassword, 10)

//         const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword })
//         return res.status(200).json({ success: true})


//     } catch (error) {
//         return res.status(500).json({ success: false, error: "setting error" })
//     }
// }

import User from "../models/User.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Compare oldPassword with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong old password" });
        }

        // Hash the new password before saving
        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, { password: hashPassword });

        return res.status(200).json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" });
    }
};
