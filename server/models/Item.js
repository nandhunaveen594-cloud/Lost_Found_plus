import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    title: { 
        type: String 
    },
    name: { 
        type: String, 
        default: 'No Name' 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    description: { 
        type: String, 
        default: 'Without description' 
    },
    category: { 
        type: String, 
        default: 'General' 
    },
    type: { 
        type: String, 
        enum: ['Lost', 'Found', 'lost', 'found'], 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, 
        required: true 
    },
    number: { 
        type: String 
    },
    img: [
        {
            type: String,
            default: 'https://i.ibb.co/DpZ3qy2/Untitled-design-10.png',
        },
    ],
    status: {
        type: String,
        enum: ['active', 'claimed', 'resolved'],
        default: 'active',
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

// Synchronize title and name before saving
ItemsSchema.pre('save', function (next) {
    if (this.title && !this.name) {
        this.name = this.title;
    } else if (this.name && !this.title) {
        this.title = this.name;
    }
    next();
});

const Item = mongoose.model('Item', ItemsSchema)
export default Item