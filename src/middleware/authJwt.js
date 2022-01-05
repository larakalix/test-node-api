import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
    try {
        const { headers } = req;
        const token = headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const { id, exp } = jwt.verify(token, config.SECRET);
        req.userId = id;

        const exist = await User.findById(id);
        if (!exist) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized" });
    }
};

export const isAdmin = async (req, res, next) =>
    validateRole(req, res, next, "admin");

export const isMod = async (req, res, next) =>
    validateRole(req, res, next, "mod");

const validateRole = async (req, res, next, role) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let index = 0; index < roles.length; index++) {
            if (roles[index].name === role) {
                next();
                return;
            }
        }

        return res
            .status(403)
            .json({ message: `Only users with ${role} role can access` });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error });
    }
};
