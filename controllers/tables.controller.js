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
        case 'collections':
            collection = await Collection.find();
            break;
    }
    console.log(collection)
    res.status(200).json({collection})
}



// const users = new Collection({
//     name: 'users',
//     slag: 'Користувачі',
//     collectionFileds: [
//         {
//             name: 'id',
//             slag: '№',
//             fieldType: 'ObjectId',
//             toDisplay: false
//         },
//         {
//             name: 'places',
//             slag: 'Місця',
//             fieldType: 'Array',
//             toDisplay: true
//         },
//         {
//             name: 'avatar',
//             slag: 'Зображення',
//             fieldType: 'File',
//             toDisplay: true
//         },
//         {
//             name: 'newsSubscribe',
//             slag: 'Підписка на новини',
//             fieldType: 'Boolean',
//             toDisplay: true
//         },
//         {
//             name: 'allowReview',
//             slag: 'Дозволити коментарі',
//             fieldType: 'Boolean',
//             toDisplay: true
//         },
//         {
//             name: 'allowReply',
//             slag: 'Дозволити відповіді',
//             fieldType: 'Boolean',
//             toDisplay: true
//         },
//         {
//             name: 'name',
//             slag: 'Ім`я',
//             fieldType: 'String',
//             toDisplay: true
//         },
//         {
//             name: 'email',
//             slag: 'Емейл',
//             fieldType: 'String',
//             toDisplay: true
//         },
//         {
//             name: 'password',
//             slag: 'Пароль',
//             fieldType: 'String',
//             toDisplay: true
//         }
//     ]
// })
// await users.save();

// const collections = new Collection({
//     name: 'collections',
//     slag: 'Колекції',
//     collectionFileds: [
//         {
//             name: 'id',
//             slag: '№',
//             fieldType: 'ObjectId',
//             toDisplay: true
//         },
//         {
//             name: 'collection',
//             slag: 'Колекція',
//             fieldType: 'String',
//             toDisplay: true
//         }
//     ]
// })
// await collections.save();
