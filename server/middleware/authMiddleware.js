import { auth } from "../config/firebaseAdmin.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const idToken = authorization.split("Bearer ")[1];

    // Verify Firebase Token
    const decodedToken = await auth.verifyIdToken(idToken);

    let user = await User.findOne({
      email: decodedToken.email,
    });

    // First Login → Create User
    if (!user) {
      user = await User.create({
        name:
          decodedToken.name ||
          decodedToken.email.split("@")[0],

        email: decodedToken.email,

        googleId: decodedToken.uid,

        avatar: decodedToken.picture || "",

        provider: "google",

        isVerified: true,

        lastLogin: new Date(),
      });
    } else {
      // Update Existing User
      user.name =
        decodedToken.name || user.name;

      user.avatar =
        decodedToken.picture || user.avatar;

      user.lastLogin = new Date();

      await user.save();
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Firebase Authentication Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired Firebase token.",
    });
  }
};

export default authMiddleware;