import express from "express";
import { getUser, update ,deleteUser, follow, unFollow,} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("you in get route");
// });

// Update User
router.put("/:id", verifyToken, update);    // verifyToken is middlware which verify 

// Get User
router.get("/find/:id", getUser);

// Delete User
router.delete("/:id", verifyToken, deleteUser);

// Follow
router.put("/follow/:id", verifyToken, follow); 

// Unfollow
router.put("/unfollow/:id", verifyToken, unFollow);


export default router;