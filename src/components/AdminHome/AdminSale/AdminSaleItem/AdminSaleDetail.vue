<template>
  <h2 class="text-center text-primary">
    Sửa thông tin Sale
  </h2>
  <!-- Begin Form -->
  <form
    class="w-50 mx-auto"
    @submit.prevent="editSale(saleId)"
  >
    <!-- Tên  -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Tên Sale</label>

      <label
        v-if="errors.name"
        class="form-group text-danger ml-2"
      >{{
        errors.name
      }}</label>

      <input
        v-model="saleDetail.name"
        type="text"
        class="form-control"
        placeholder="Nhập tên sale..."
      >
    </div>

    <!-- Mức giảm -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Mức giảm (%)</label>
      <label
        v-if="errors.percent"
        class="form-group text-danger ml-2"
      >{{
        errors.percent
      }}</label>
      <input
        v-model="saleDetail.percent"
        type="text"
        class="form-control"
        placeholder="Nhập mức giảm..."
      >
    </div>

    <!-- Ngày bắt đầu -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Ngày bắt đầu</label>
      <label
        v-if="errors.created_at"
        class="form-group text-danger ml-2"
      >{{
        errors.created_at
      }}</label>
      <input
        v-model="saleDetail.created_at"
        type="text"
        class="form-control"
      >
    </div>

    <!-- Ngày kết thúc -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Ngày kết thúc</label>
      <label
        v-if="errors.endDate"
        class="form-group text-danger ml-2"
      >{{
        errors.endDate
      }}</label>
      <input
        v-model="saleDetail.endDate"
        type="text"
        class="form-control"
      >
    </div>

    <button
      type="submit"
      class="btn btn-primary"
    >
      Sửa
    </button>
    <br>
    <router-link
      :to="{ name: 'AdminSale' }"
      class="btn btn-outline-primary float-right"
    >
      Quay lại
    </router-link>
  </form>
  <!-- End Form -->
</template>

<script>
export default {
  name: 'AdminSaleDetail',
  data() {
    return {
      saleId: null,
      saleDetail: {},
      errors: {}
    }
  },
  beforeMount() {
    this.getOneSale()
  },
  methods: {
    async getOneSale() {
      this.saleId = this.$route.params.id

      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/sales/${this.saleId}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )
        const resData = await res.json()

        if (res.status === 200) {
          this.saleDetail = resData
        }

        if (res.status === 404 || res.status === 500) {
          alert(resData.message)
        }

        if (
          res.status === 401 &&
          resData.message === 'Access token đã hết hạn'
        ) {
          let d = new Date()
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
          let expires = 'expires=' + d.toUTCString()
          document.cookie =
            'accessToken=' +
            resData.newAccessToken +
            ';' +
            expires +
            ';path=/' +
            ';secure'

          await this.getOneSale()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    validate() {
      this.errors = {}
      if (!this.saleDetail.name) {
        this.errors.name = 'Tên sale không được để trống!'
      }
      if (
        !this.saleDetail.percent ||
        isNaN(this.saleDetail.percent) ||
        this.saleDetail.percent < 0 ||
        this.saleDetail.percent > 100
      ) {
        this.errors.percent = 'Mức giảm phải là số từ 0 đến 100!'
      }
      if (!this.saleDetail.created_at) {
        this.errors.created_at = 'Cần chọn ngày bắt đầu!'
      }
      if (!this.saleDetail.endDate) {
        this.errors.endDate = 'Cần chọn ngày kết thúc!'
      }
    },
    async editSale(id) {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            `http://book-store-meshop.herokuapp.com/sales/${id}`,

            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'bookstore-access-token': accessToken,
                'bookstore-refresh-token': refreshToken
              },
              body: JSON.stringify(this.saleDetail)
            }
          )

          const resData = await res.json()

          if (res.status === 200) {
            this.saleDetail = resData
            alert('Sửa thông tin sale thành công!')
            this.$router.push('/admin-sale')
          }

          if (res.status === 404 || res.status === 500) {
            alert(resData.message)
          }

          if (
            res.status === 401 &&
            resData.message === 'Access token đã hết hạn'
          ) {
            let d = new Date()
            d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
            let expires = 'expires=' + d.toUTCString()
            document.cookie =
              'accessToken=' +
              resData.newAccessToken +
              ';' +
              expires +
              ';path=/' +
              ';secure'
          }
        } catch (error) {
          alert(error.message)
        }

        this.getOneSale()
      }
    }
  }
}
</script>

<style></style>
