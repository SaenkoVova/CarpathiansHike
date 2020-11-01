const PlaceCategory = require('../models/PlaceCategory');

module.exports.getPlacesCategories = async (req, res) => {
    try {
        const categories = await PlaceCategory.find();
        res.status(200).json({categories})
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}