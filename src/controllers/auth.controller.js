import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signIn = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('roles');
    if (!user) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(password, user.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, config.SECRET, { 
        expiresIn: config.TOKEN_EXPIRE
    });

    res.status(200).json({ token });
}

export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;
    const user = new User({ username, email, password: await User.encryptPassword(password) });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        user.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: "user" });
        user.roles = [role._id];
    }

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, config.SECRET, { 
        expiresIn: config.TOKEN_EXPIRE
    });

    res.status(200).json({ token });
}
