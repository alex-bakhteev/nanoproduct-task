import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as fsp from 'fs/promises';

import { UserController, DoctorController } from './controllers/index.js';
import DoctorModel from './models/Doctor.js';

mongoose
    .connect('YOUR_MONGODB_LINK')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.use(cors());

// User

app.post('/user/register', UserController.register);

app.post('/user/me', UserController.getMe);

app.post('/user/update', UserController.update);

// Doctor

app.post('/doctor/register', DoctorController.register);

app.post('/doctor/me', DoctorController.getMe);

app.post('/doctor/appointment', DoctorController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    else {
        console.log('OK');
    }
});

setInterval(async () => {

    const date = new Date();
    const currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0, -8).split('T').join(' ');

    const appointments = await DoctorModel.find();

    appointments.map((item) => { return { slots: item.slots, name: item.name, spec: item.spec } }).flat()

    for (const item of appointments) {
        if (item.slots.length) {
            for (const slot of item.slots) {

                const dateMinusDay = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                dateMinusDay.setMinutes(dateMinusDay.getMinutes() + 1440);
                const day = dateMinusDay.toISOString().slice(0, -14).split('-').reverse().join('.');
                const time = dateMinusDay.toISOString().slice(11, -8);
                const notifyTomorrow = `${day}, ${time}`;

                const dateMinusTwo = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                dateMinusTwo.setMinutes(dateMinusTwo.getMinutes() + 120);
                const dayMinusTwoHours = dateMinusTwo.toISOString().slice(0, -14).split('-').reverse().join('.');
                const timeMinusTwoHours = dateMinusTwo.toISOString().slice(11, -8);
                const notify2hours = `${dayMinusTwoHours}, ${timeMinusTwoHours}`;

                if (slot.date === notifyTomorrow) {
                    await fsp.appendFile('messages.log', `${currentDate} | Привет ${slot.patient}! Напоминаем, что вы записаны к ${item.spec} ${item.name} завтра в ${slot.date}!\n`);
                }
                else {
                    if (slot.date === notify2hours) {
                        await fsp.appendFile('messages.log', `${currentDate} | Привет ${slot.patient}! Вам через 2 часа к ${item.spec} ${item.name} в ${slot.date}!\n`);
                    }
                }


            }
        }
        else {

        }
    }
}, 60000);