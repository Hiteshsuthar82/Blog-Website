import { Router } from "express";
import {
  registerUser,
  verifyEmailOtp,
  resendOtp,
  loginUser,
  logoutUser,
  deleteAccount,
  refreshAccessToken,
  changePassword,
  updateUserProfile,
  getCurrentUser,
  updateUserAvatar,
  upgradeToPremium,
  onlyuploadImage,
  sendCustomEmail
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Verify email OTP
router.post("/verify-email", verifyEmailOtp);
router.post("/resend-otp", resendOtp);

router.route("/login").post(loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/delete-account").delete(verifyJWT, deleteAccount);


router.route("/refresh-token").post(verifyJWT,refreshAccessToken);

router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/update-profile").patch(verifyJWT, updateUserProfile);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);


router.route("/get-current-user").get(verifyJWT, getCurrentUser);


router.route("/upgrade-to-premium").patch(verifyJWT, upgradeToPremium);

router
.route("/only-uplaod-image")
.patch(upload.single("onlyimage"), onlyuploadImage);

router.route("/custom-mail-message").post( sendCustomEmail);

export default router;