import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '../components/AdminHome/AdminHome.vue'
import AdminLogin from '../components/AdminHome/AdminLogin.vue'
import AdminCategory from '../components/AdminHome/AdminCategory/AdminCategory.vue'
import AdminBook from '../components/AdminHome/AdminBook/AdminBook.vue'
import AdminBookDetail from '../components/AdminHome/AdminBook/AdminBookItem/AdminBookDetail.vue'
import AdminBill from '../components/AdminHome/AdminBill/AdminBill.vue'
import AdminSale from '../components/AdminHome/AdminSale/AdminSale.vue'
import AdminSaleDetail from '../components/AdminHome/AdminSale/AdminSaleItem/AdminSaleDetail.vue'
import AdminVoucher from '../components/AdminHome/AdminSale/AdminVoucher.vue'
import AdminVoucherDetail from '../components/AdminHome/AdminSale/AdminVoucherItem/AdminVoucherDetail.vue'
import AdminUser from '../components/AdminHome/AdminUser/AdminUser.vue'
import AdminUserDetail from '../components/AdminHome/AdminUser/AdminUserItem/AdminUserDetail.vue'
import ErrorPage from '../components/AdminHome/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/admin-login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin-category',
      name: 'AdminCategory',
      component: AdminCategory
    },
    {
      path: '/admin-book',
      name: 'AdminBook',
      component: AdminBook
    },
    {
      path: '/admin-book-detail/:id',
      name: 'AdminBookDetail',
      component: AdminBookDetail
    },
    {
      path: '/admin-bill',
      name: 'AdminBill',
      component: AdminBill
    },
    {
      path: '/admin-sale',
      name: 'AdminSale',
      component: AdminSale
    },
    {
      path: '/admin-sale-detail/:id',
      name: 'AdminSaleDetail',
      component: AdminSaleDetail
    },
    {
      path: '/admin-voucher',
      name: 'AdminVoucher',
      component: AdminVoucher
    },
    {
      path: '/admin-voucher-detail/:id',
      name: 'AdminVoucherDetail',
      component: AdminVoucherDetail
    },
    {
      path: '/admin-user',
      name: 'AdminUser',
      component: AdminUser
    },
    {
      path: '/admin-user-detail/:id',
      name: 'AdminUserDetail',
      component: AdminUserDetail
    },
    {
      path: '/:pathMatch(.*)*',
      component: ErrorPage
    }
  ]
})

export default router
