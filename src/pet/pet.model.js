import { Schema, model } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        uppercase: true,
        required: true
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});

petSchema.methods.toJSON = function(){
    const {password, _id, ...pset} = this.toObject()
    pet.uid = _id
    return pet
}

export default model("Pet", petSchema);