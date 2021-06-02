const { Types } = require("mongoose");
const Place = require("../models/Place");
const Route = require("../models/Route");
const router = require("../routes/route.route");

module.exports.getRoutes = async (req, res) => {
    try {
        let {showedItems, page} = req.query;
        showedItems = parseInt(showedItems, 10);
        page = parseInt(page, 10);
        let routes = []
        if(page === 1) {
            routes = await Route.find().limit(showedItems);
        }
        else {
            routes = await Route.find().skip(showedItems * (page - 1)).limit(showedItems);
        }
        res.status(200).json({routes});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadRoutesDurations = async (req, res) => {
    try {
        const routes = await Route.find({}, 'duration')
        res.status(200).json(routes)
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadByDuration = async (req, res) => {
    try {
        console.log(req.query)
        const routes = await Route.find({
            duration: req.query.duration
        })
        res.status(200).json(routes)
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.loadByLevel = async (req, res) => {
    try {
        const routes = await Route.find({
            level: req.query.level
        })
        res.status(200).json(routes)
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}


module.exports.getRouteById = async(req, res) => {
    try {
        const {id} = req.query;
        const route = await Route.findById(id);
        const start = await Place.findById(route.start, 'lt lg title');
        const end = await Place.findById(route.end, 'lt lg title');
        const routePeaks = await Place.find({
            _id: {$in: route.routePeaks}
        }, 'title');
        const routeInteresting = await Place.find({
            _id: {$in: route.routeInteresting}
        }, 'title');
        const nearestPlaces = await Place.find({
            _id: {$in: route.nearestPlaces}
        }, 'title');
        res.status(200).json({route, start, end, routePeaks, routeInteresting, nearestPlaces});
        
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

// const route = new Route({
//     start: Types.ObjectId("5f9de1ce999c753c44fc7151"),
//     end: Types.ObjectId("5f9de1ce999c753c44fc7152"),
//     distance: 7.1,
//     level: 'Початківець',
//     description: 'Популярний маршрут вихідного дня. До одного з найвідоміших озер Карпат.Починається від туристичної бази Заросляк. Озеро Несамовите знаходиться на Чорногірському хребті. Це легкий маршрут, який без проблем пройдуть навіть діти. Відстань вказана в один бік. Від Заросляка до озера. Врахуйте таку саму відстань в зворотньому напрямку. Як і час на зворотню дорогу.',
//     routeCategoriesId: [
//         Types.ObjectId('5f9f271898259239a049e1bd'),
//         Types.ObjectId('5f9f271898259239a049e1be'),
//         Types.ObjectId('5f9f271898259239a049e1c0')
//     ],
//     previewImage: '20170607_1664644203-3.jpg',
//     images: ['1517479038_goverla-3.jpg', '20170607_1664644203.jpg'],
//     geoJson: 'route1.json',
//     path: 'Місце 0 - місце 1',
//     duration: 4,
//     routePeaks: [
//         Types.ObjectId('5f9de1cf999c753c44fc715c'),
//         Types.ObjectId('5f9de1cf999c753c44fc715d')
//     ],
//     routeInteresting: [
//         Types.ObjectId('5f9de1cf999c753c44fc7164'),
//         Types.ObjectId('5f9de1cf999c753c44fc7163')
//     ],
//     nearestPlaces: [
//         Types.ObjectId('5f9de1d1999c753c44fc7178'),
//         Types.ObjectId('5f9de1d1999c753c44fc7177')
//     ]
// })
// await route.save();
