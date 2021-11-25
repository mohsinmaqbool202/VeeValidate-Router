import UserIndex from './components/users/index.vue';
import UserCreate from './components/users/create.vue';
import UserEdit from './components/users/edit.vue';
import CategoryIndex from './components/categories/index.vue';
import CategoryCreate from './components/categories/create.vue';
import CategoryEdit from './components/categories/edit.vue';
import ProductIndex from './components/products/index.vue';
import ProductCreate from './components/products/create.vue';
import ProductEdit from './components/products/edit.vue';
import PostIndex from './components/posts/index.vue';
import PostCreate from './components/posts/create.vue';
import PostEdit from './components/posts/edit.vue';

export const routes = [
    {
        path: '/',
        redirect: '/users'
    },

    //users routes
    {
        path: '/users',
        component: UserIndex,
        name: "UserIndex"
    },
    {
        path: '/users/create',
        component: UserCreate,
        name: "UserCreate"
    },
    {
        path: '/users/edit/:userId',
        component: UserEdit,
        name: "UserEdit"
    },

    //products routes
    {
        path: '/products',
        component: ProductIndex,
        name: "ProductIndex"
    },
    {
        path: '/products/create',
        component: ProductCreate,
        name: "ProductCreate"
    },
    {
        path: '/products/edit/:productId',
        component: ProductEdit,
        name: "ProductEdit"
    },

    //posts routes
    {
        path: '/posts',
        component: PostIndex,
        name: "PostIndex"
    },
    {
        path: '/posts/create',
        component: PostCreate,
        name: "PostCreate"
    },
    {
        path: '/Posts/edit/:postId',
        component: PostEdit,
        name: "PostEdit"
    },

    //categories routes
    {
        path: '/categories',
        component: CategoryIndex,
        name: "CategoryIndex"
    },
    {
        path: '/categories/create',
        component: CategoryCreate,
        name: "CategoryCreate"
    },
    {
        path: '/categories/edit/:catId',
        component: CategoryEdit,
        name: "CategoryEdit"
    }
];