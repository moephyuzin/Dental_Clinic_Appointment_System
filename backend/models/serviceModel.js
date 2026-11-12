import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    fees: {type: Number, required: true}
}, {minimize: false })

const serviceModel = mongoose.models.service || mongoose.model('service', serviceSchema)

export default serviceModel