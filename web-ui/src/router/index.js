import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignupPage.vue';
import AdminLoginPage from '@/components/AdminLoginPage.vue';
import RegisterAuthentication from '@/components/RegisterAuthentication.vue';
import AdminProductManagement from '@/components/AdminProductManagement.vue';
import OrderManagement from '@/components/OrderManagement.vue';
import TransactionManagement from '@/components/TransactionManagement';
import ProductPage from '@/components/ProductPage.vue';
import TransactionComplete from '@/components/TransactionComplete.vue';
import SearchPage from '@/components/SearchPage.vue'
import AdminDashboard from '@/components/AdminDashboard.vue';
import AdminUserManagement from '@/components/AdminUserManagement.vue'
import UserAccount from '@/components/UserAccount.vue';
import AdminTransactionManagement from '@/components/AdminTransactionManagement.vue';
import CategoryProducts from '@/components/CategoryProducts.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/search/:searchQuery?',
    name: 'Search',
    component: SearchPage
  },
  
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signuppage',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/adminloginpage',
    name: 'AdminLoginPage',
    component: AdminLoginPage
  },
  {
    path: '/registerauthentication',
    name: 'RegisterAuthentication',
    component: RegisterAuthentication
  },
  {
    path: '/adminproductmanagement',
    name: 'AdminProductManagement',
    component: AdminProductManagement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ordermanagement',
    name: 'OrderManagement',
    component: OrderManagement
  },
  {
    path: '/transactionmanagement/:id',
    name: 'TransactionManagement',
    component: TransactionManagement
  },
  {
    path: '/product/:name',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '/transactioncomplete',
    name: 'TransactionComplete',
    component: TransactionComplete
  },
  {
    path: '/admindashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/adminusermanagement',
    name: 'AdminUserManagement',
    component: AdminUserManagement
  },
  {
    path: '/useraccount/:email',
    name: 'UserAccount',
    component: UserAccount
  },
  {
    path: '/admintransactionmanagement',
    name: 'AdminTransactionManagement',
    component: AdminTransactionManagement
  },
  {
    path: '/products',
    name: 'CategoryProducts',
    component: CategoryProducts
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
