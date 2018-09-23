const Posiion = require('../models/Position');
const errHendler = require('../untils/errHendler');


module.exports.getByCategoryId = async (req, res) => {
    try {
        const category_id = req.params.id;
        const user = req.user;
        const positions = await Posiion.find({
            category: category_id,
            user: user.id
        });
        res.status(200).json(positions);
    } catch (e) {
        errHendler(res, e)
    }
};

module.exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Posiion.remove({ _id: id });
        res.status(200).json({ message: 'pos removed' })
    } catch (e) {
        errHendler(res, e)
    }
};

module.exports.create = async (req, res) => {
    try {
        const { name, cost, category } = req.body;
        const user = req.user.id;
        const position = new Posiion({ name, cost, category, user });
        await position.save();
        res.status(201).json(position);
    } catch (e) {
        errHendler(res, e)
    }
};

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const position = await Posiion.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );
        res.status(201).json(position);
    } catch (e) {
        errHendler(res, e)
    }
};

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    res.status(201).json({
        message: "update put",
        id: id
    });
    try {

    } catch (e) {
        errHendler(res, e)
    }
};