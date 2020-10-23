export default {
    state: {
        placesCategories: [
            {
                id: 1,
                title: 'Цікаве місце'
            },
            {
                id: 2,
                title: 'Вершина гори',
                image: 'mountains.png'
            },
            {
                id: 3,
                title: 'Полонина'
            },
            {
                id: 4,
                title: 'Водний об`єкт'
            },
            {
                id: 5,
                title: 'Орієнтир/Вказівник'
            },
            {
                id: 6,
                title: 'Джерело/Криниця'
            },
            {
                id: 7,
                title: 'Місце для привалу'
            },
            {
                id: 8,
                title: 'Туристична будівля'
            },
            {
                id: 9,
                title: 'Рятувальники/Служби'
            },
            {
                id: 10,
                title: 'Небезпечне місце'
            }
        ]
    },
    getters: {
        getPlacesCategories: (state) => state.placesCategories
    }
}