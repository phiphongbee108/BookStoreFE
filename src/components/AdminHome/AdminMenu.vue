<template>
  <!-- Sidebar -->
  <ul
    v-if="acCookie"
    id="accordionSidebar"
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion w-100"
  >
    <!-- Sidebar - Brand -->

    <router-link
      class="nav-link btn btn-primary text-light w-100 my-2"
      :to="{ name: 'AdminHome' }"
    >
      Trang chủ
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <button
      class="btn btn-danger my-2"
      @click="logout"
    >
      Đăng xuất
    </button>

    <!-- Nav Item  -->
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminCategory' }"
      >
        Danh mục
      </router-link>
    </li>
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminBook' }"
      >
        Sách
      </router-link>
    </li>
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminUser' }"
      >
        Người dùng
      </router-link>
    </li>
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminBill' }"
      >
        Đơn hàng
      </router-link>
    </li>
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminSale' }"
      >
        Sale
      </router-link>
    </li>
    <li class="nav-item active">
      <router-link
        class="nav-link btn btn-primary text-light w-100 my-2"
        :to="{ name: 'AdminVoucher' }"
      >
        Voucher
      </router-link>
    </li>
  </ul>
  <!-- End of Sidebar -->

  <div
    v-else
    class="mt-5 text-center"
  >
    <p class="text-danger">
      Bạn cần đăng nhập!
    </p>
    <router-link
      class="btn btn-outline-primary"
      :to="{ name: 'AdminLogin' }"
    >
      Đến trang đăng nhập
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  data() {
    return {
      acCookie: undefined,
      rfCookie: undefined
    }
  },
  beforeMount() {
    this.checkLogin()
  },
  methods: {
    async checkLogin() {
      this.acCookie = await window.cookieStore.get('accessToken')
    },
    async logout() {
      this.acCookie = await window.cookieStore.delete('accessToken')
      this.rfCookie = await window.cookieStore.delete('refreshToken')

      this.$router.push('/admin-login')
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  #accordionSidebar {
    min-height: auto !important;
  }
}
</style>
