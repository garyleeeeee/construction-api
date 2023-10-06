const bcrypt = require('bcrypt');

async function genHash (password) {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate hash!');
    }
}

async function compareHash (password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        consol.log(error);
        throw new Error('Failed to compare hash!');
    }
}


module.exports = {
    genHash,
    compareHash,
}
