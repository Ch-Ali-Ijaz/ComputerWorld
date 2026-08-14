import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    userPassword: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    userCNIC: {
        type: String,
        required: function(){
            if(this.userRole === "customer" || this.userRole === "employee"){
                return false;
            }
            else{
                return true;
            }
        }
    },

    userEmail: {
        type: String,
        required: true,
        unique: true
    },

    userContact: {
        type: String,
        required: true
    },

    userAddress: {
        type: String
    },

    userRole: {
        type: String,
        enum: ["admin", "employee", "customer"],
        required: true
    }
},

    { timestamps: true }
);

userSchema.index(
    { userCNIC: 1 },
    {
        unique: true,
        partialFilterExpression: {
            userCNIC: { $exists: true }
        }
    }
);

const User = mongoose.model("User", userSchema);

export default User