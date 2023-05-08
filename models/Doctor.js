import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
    spec: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slots: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true,

});

export default mongoose.model('Doctor', DoctorSchema);