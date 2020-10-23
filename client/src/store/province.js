export default {
    state: {
        provinces: [
            {
                id: 1,
                title: 'Чорногора'
            },
            {
                id: 2,
                title: 'Мармароський масив'
            },
            {
                id: 3,
                title: 'Свидівець'
            },
            {
                id: 4,
                title: 'Горгани'
            },
            {
                id: 5,
                title: 'Чивчинські гори'
            },
            {
                id: 6,
                title: 'Полонинський хребет (Боржава)'
            },
            {
                id: 7,
                title: 'Гринявські гори'
            }
        ]
    },
    getters: {
        getProvinces: (state) => state.provinces
    }
}