const UserModule = require('../models/user.models');

const listUser = async (req, res) => {
    try {
        const UserList = await UserModule.find();
        res.status(200).json({
            user: UserList
        });
    } catch(error) {
        console.error("Error while listing user ", error);
        res.status(500).json({ message:"Failed to list users ", error: error.message });
    }
}

const UserController = {
    listUser
}

module.exports = UserController;