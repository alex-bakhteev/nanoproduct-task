import DoctorModel from '../models/Doctor.js';

export const register = async (req, res) => {
    try {

        const user = DoctorModel({
            spec: req.body.spec,
            name: req.body.name,
            slots: req.body.slots,
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
        const user = await DoctorModel.find();
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
};

export const update = async (req, res) => {
    try {

        if (/^\d{2}\.\d{2}\.\d{4}\,\s\d{2}\:\d{2}/.test(req.body.date)) {

            const doctor = await DoctorModel.find({ _id: req.body.id });

            const currentSlots = doctor[0].slots;

            const check = doctor[0].slots.map(obj => Object.keys(obj).some(key => obj[key] === req.body.date));

            if (!check.some(item => item === true)) {

                currentSlots.push({ date: req.body.date, patient: req.body.patient });

                await DoctorModel.updateOne({ _id: req.body.id },
                    { slots: currentSlots });

                res.json({
                    message: 'Запись прошла успешно!'
                });
            }
            else {
                return res.json({
                    message: 'Данное время уже занято!'
                })
            }
        }
        else {
            res.json({
                message: 'Неверный формат даты! Пример: 07.05.2023, 08:30'
            });
        }

    } catch (err) {
        console.log(err);
    }
}