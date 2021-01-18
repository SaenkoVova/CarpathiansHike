const Collection = require('../models/Collection');
const User = require('../models/User');

exports.getTables = async (req, res) => {
    const collections = await Collection.find();
    res.status(200).json({collections})
}

exports.readTable = async (req, res) => {
    const tableName = req.query.tableName;
    let collection = [];
    switch(tableName) {
        case 'users':
            collection = await User.find({}, 'avatar newsSubscribe allowReview allowReply name email');
            break;
    }
    res.status(200).json({collection})
}




















// const users = new Collection({
//     name: 'users',
//     slag: 'Користувачі',
//     collectionFileds: [
//         {
//             name: 'id',
//             slag: '№',
//             fieldType: 'ObjectId'
//         },
//         {
//             name: 'places',
//             slag: 'Місця',
//             fieldType: 'Array'
//         },
//         {
//             name: 'avatar',
//             slag: 'Зображення',
//             fieldType: 'File'
//         },
//         {
//             name: 'newsSubscribe',
//             slag: 'Підписка на новини',
//             fieldType: 'Boolean'
//         },
//         {
//             name: 'allowReview',
//             slag: 'Дозволити коментарі',
//             fieldType: 'Boolean'
//         },
//         {
//             name: 'allowReplay',
//             slag: 'Дозволити відповіді',
//             fieldType: 'Boolean',
//         },
//         {
//             name: 'name',
//             slag: 'Ім`я',
//             fieldType: 'String'
//         },
//         {
//             name: 'email',
//             slag: 'Емейл',
//             fieldType: 'String'
//         },
//         {
//             name: 'password',
//             slag: 'Пароль',
//             fieldType: 'String'
//         }
//     ]
// })
// await users.save();