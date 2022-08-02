<template>
  <h2 class="text-center text-primary">
    Sửa thông tin Voucher
  </h2>
  <!-- Begin Form -->
  <form
    class="w-50 mx-auto"
    @submit.prevent="editVoucher(voucherId)"
  >
    <!-- Tên  -->
    <div class="form-group">
      <label for="">Mã voucher</label>

      <label
        v-if="errors.code"
        class="form-group text-danger ml-2"
      >{{
        errors.code
      }}</label>

      <input
        v-model="voucherDetail.code"
        type="text"
        class="form-control"
      >
    </div>

    <!-- Bậc người dùng được sử dụng  -->
    <div class="form-group">
      <label for="">Bậc người dùng được sử dụng</label>

      <label
        v-if="errors.id_userType"
        class="form-group text-danger ml-2"
      >{{
        errors.id_userType
      }}</label>

      <select
        id="selectUserType"
        v-model="voucherDetail.id_userType"
        class="custom-select"
      >
        <option
          v-for="userType in userTypes"
          :key="userType.id"
          :value="userType.id"
        >
          {{ userType.type }}
        </option>
      </select>
    </div>

    <!-- Mức giảm -->
    <div class="form-group">
      <label for="">Mức giảm (%)</label>
      <label
        v-if="errors.percent"
        class="form-group text-danger ml-2"
      >{{
        errors.percent
      }}</label>
      <input
        v-model="voucherDetail.percent"
        type="text"
        class="form-control"
      >
    </div>

    <!-- Ngày hết hạn -->
    <div class="form-group">
      <label for="">Ngày hết hạn</label>
      <label
        v-if="errors.expired"
        class="form-group text-danger ml-2"
      >{{
        errors.expired
      }}</label>
      <input
        v-model="voucherDetail.expired"
        type="text"
        class="form-control"
      >
    </div>

    <!-- Mức giá tối thiểu áp dụng -->
    <div class="form-group">
      <label for="">Mức giá tối thiểu áp dụng</label>
      <label
        v-if="errors.min_bill"
        class="form-group text-danger ml-2"
      >{{
        errors.min_bill
      }}</label>
      <input
        v-model="voucherDetail.min_bill"
        type="text"
        class="form-control"
      >
    </div>

    <!-- Số lượng -->
    <div class="form-group">
      <label for="">Số lượng</label>
      <label
        v-if="errors.quantity"
        class="form-group text-danger ml-2"
      >{{
        errors.quantity
      }}</label>
      <input
        v-model="voucherDetail.quantity"
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
      :to="{ name: 'AdminVoucher' }"
      class="btn btn-outline-primary float-right"
    >
      Quay lại
    </router-link>
  </form>
  <!-- End Form -->
</template>

<script>
export default {
  name: 'AdminVoucherDetail',
  data() {
    return {
      voucherId: null,
      userTypes: [],
      voucherDetail: {},
      errors: {}
    }
  },
  beforeMount() {
    this.getOneVoucher(), this.getAllUserTypes()
  },
  methods: {
    async getOneVoucher() {
      this.voucherId = this.$route.params.id

      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/vouchers/${this.voucherId}`,
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
          this.voucherDetail = resData
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

          await this.getOneVoucher()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    async getAllUserTypes() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/types',
          {
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )

        const resData = await res.json()

        if (res.status === 200) {
          this.userTypes = resData
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

          await this.getAllUserTypes()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    validate() {
      this.errors = {}
      if (!this.voucherDetail.code) {
        this.errors.code = 'Mã voucher không được để trống!'
      }
      if (!this.voucherDetail.id_userType) {
        this.errors.id_userType = 'Bậc người dùng không được để trống!'
      }
      if (
        !this.voucherDetail.percent ||
        isNaN(this.voucherDetail.percent) ||
        this.voucherDetail.percent < 0 ||
        this.voucherDetail.percent > 100
      ) {
        this.errors.percent = 'Mức giảm phải là số từ 0 đến 100!'
      }
      if (!this.voucherDetail.expired) {
        this.errors.expired = 'Cần nhập ngày kết thúc!'
      }
      if (!this.voucherDetail.min_bill || isNaN(this.voucherDetail.min_bill)) {
        this.errors.min_bill = 'Cần nhập mức giá tối thiểu là số!'
      }
      if (!this.voucherDetail.quantity || isNaN(this.voucherDetail.quantity)) {
        this.errors.quantity = 'Cần nhập số lượng là số!'
      }
    },
    async editVoucher(id) {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            `http://book-store-meshop.herokuapp.com/vouchers/${id}`,

            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'bookstore-access-token': accessToken,
                'bookstore-refresh-token': refreshToken
              },
              body: JSON.stringify(this.voucherDetail)
            }
          )

          const resData = await res.json()

          if (res.status === 200) {
            this.voucherDetail = resData
            alert('Sửa thông tin voucher thành công!')
            this.$router.push('/admin-voucher')
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

        this.getOneVoucher()
      }
    }
  }
}
</script>

<style></style>
