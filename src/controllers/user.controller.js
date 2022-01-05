import User from "../models/User";

export const getUsers = async (req, res) =>
    res.status(200).json(await User.find());
