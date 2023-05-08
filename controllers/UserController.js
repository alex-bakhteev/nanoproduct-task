import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {

        const user = UserModel({
            phone: req.body.phone,
            name: req.body.name,
        });

        await user.save();

        res.json({
            status: 200
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться!',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
};

export const update = async (req, res) => {
    try {

        await UserModel.updateOne({ _id: req.body.id },
            {
                password: req.body.password
            });

        res.json({
            status: 200
        });

    } catch (err) {
        console.log(err);
    }
}