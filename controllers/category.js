const Category = require('../models/Category');
const Position = require('../models/Position');
const errHendler = require('../untils/errHendler');

module.exports.getAll = async (req, res) => {
    try {
        const user = req.user.id;
        const categories = await Category.find({ user });
        res.status(200).json(categories);
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user.id;
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.remove({_id:id});
        await Position.remove({category:id});
        res.status(200).json({message:'category removed'});
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports.create = async (req, res) => {
    const {name} = req.body;
    const user = req.user.id
    const category = new Category({
        name,
        user,
        imageSrc:req.file ? req.file.path : '' 
    });
    try {
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const {name} = req.body;
        const updated = {name};
        if(req.file){
            updated.imageSrc = req.file.path
        };
        const id = req.params.id;
        const user = req.user.id;
        const category = await Category.findByIdAndUpdate(
            {_id:id},
            {$set:updated},
            {new:true}
        )
        res.status(201).json(category);
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    res.status(201).json({
        message: "update put",
        id: id
    });
    try {

    } catch (err) {
        errHendler(res, err);
    }
};
