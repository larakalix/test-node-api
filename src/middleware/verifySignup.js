import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const user = await User.findOne({ username });
        if (user)
            return res.status(400).json({ message: "The user already exists" });

        const foundEmail = await User.findOne({ email });
        if (foundEmail)
            return res
                .status(400)
                .json({ message: "The email already exists" });

        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const checkRolesExisted = (req, res, next) => {
    const { roles } = req.body;

    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                return res.status(400).json({
                    message: `Role ${roles[i]} does not exist`,
                });
            }
        }
    }

    next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
