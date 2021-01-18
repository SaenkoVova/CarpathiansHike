import store from '@/store';
export default [
    {
        path: '*',
        meta: {
            name: '',
            requiresAuth: true
        },
        redirect: {
            path: '/dashboard'
        }
    },
    {
        path: '/',
        meta: {
            name: '',
            requiredAuth: false
        },
        component: () => import('@/views/LoginHome.vue'),
        beforeEnter: (to, from, next) => {
            if(store.getters.authorized) {
                next('/dashboard');
            } else {
                next();
            }
        },
        children: [
            {
                path: '',
                component: () => import('@/components/LoginForm.vue')
            }
        ]
    },
    {
        path: '/dashboard',
        meta: {
            name: 'Dashboard Wiew',
            requiresAuth: true
        },
        component: () => import('@/views/DashboardView.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/components/DashViews/Dashboard.vue')
            },
            {
                path: 'user-profile',
                meta: {
                    name: 'UserProfile',
                    requiredAuth: true
                },
                component: () => import('@/components/DashViews/UserProfile.vue')
            },
            {
                path: 'tables/:tableName',
                props: true,
                component: () => import('@/components/DashViews/TemplateTables.vue')
            }
        ]
    }
]