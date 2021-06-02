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
                path: '/users',
                name: 'Users',
                component: () => import('@/components/DashViews/Users.vue')
            },
            {
                path: '/place-categories',
                name: 'PlaceCategories',
                component: () => import('@/components/DashViews/PlaceCategories.vue')
            },
            {
                path: '/massif',
                name: 'Massif',
                component: () => import('@/components/DashViews/Massif.vue')
            },
            {
                path: '/locations',
                name: 'Locations',
                component: () => import('@/components/DashViews/Locations.vue')
            },
            {
                path: '/routes',
                name: 'Routes',
                component: () => import('@/components/DashViews/Routes.vue')
            },
            {
                path: '/routes-categories',
                name: 'RoutesCategories',
                component: () => import('@/components/DashViews/RoutesCategories.vue')
            },
            {
              path: 'reporting',
              meta: {
                  name: 'Reporting',
                  requiredAuth: true
              },
                component: () => import('@/components/DashViews/Reporting')
            }
        ]
    }
]
