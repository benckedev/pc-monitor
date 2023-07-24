const pc = require('../../schemas/pc_default/pc.js')

async function updateInfo(options = { _id: 'nulo' }) {
    let pc_list;
    let pc_all = await pc.find();
    if (options._id === 'nulo') pc_list = pc_all
    else pc_list = await pc.findOne({ _id: options._id })

    if (pc_list === null) pc_list = pc_all


    return pc_list
}

module.exports = { updateInfo }
