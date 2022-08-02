<template>
  <h1 class="text-center text-primary">
    Voucher
  </h1>

  <!-- Button trigger modal add voucher-->
  <button
    type="button"
    class="btn btn-primary float-md-right mb-2"
    data-toggle="modal"
    data-target="#addVoucherModal"
  >
    <i class="fas fa-plus" /> Thêm Voucher
  </button>
  <!-- Modal add voucher -->
  <div
    id="addVoucherModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addVoucherModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="addVoucherModalLabel"
            class="modal-title"
          >
            Thông tin Voucher
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Begin Form -->
          <form @submit.prevent="addVoucher">
            <!-- Tên -->
            <div class="form-group">
              <label for="">Mã Voucher</label>

              <label
                v-if="errors.code"
                class="form-group text-danger mx-2"
              >{{
                errors.code
              }}</label>

              <input
                v-model="voucher.code"
                type="text"
                class="form-control"
                placeholder="Nhập mã voucher..."
              >
            </div>

            <!-- Xếp hạng người dùng -->
            <div class="form-group">
              <div class="input-group mb-3">
                <label
                  v-if="errors.id_userType"
                  class="form-group text-danger mx-2"
                >{{ errors.id_userType }}</label>
                <div class="input-group-prepend">
                  <label
                    class="input-group-text"
                    for="selectUserType"
                  >Bậc người dùng được sử dụng</label>
                  <select
                    id="selectUserType"
                    v-model="voucher.id_userType"
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
              </div>
            </div>

            <!-- Mức giảm -->
            <div class="form-group">
              <label for="">Mức giảm (%)</label>
              <label
                v-if="errors.percent"
                class="form-group text-danger mx-2"
              >{{ errors.percent }}</label>
              <input
                v-model="voucher.percent"
                type="text"
                class="form-control"
                placeholder="Nhập mức giảm..."
              >
            </div>

            <!-- Ngày kết thúc -->
            <div class="form-group">
              <label for="">Ngày kết thúc</label>
              <label
                v-if="errors.expired"
                class="form-group text-danger mx-2"
              >{{ errors.expired }}</label>
              <input
                v-model="voucher.expired"
                type="datetime-local"
                class="form-control"
              >
            </div>

            <!-- Mức giá tối thiểu áp dụng -->
            <div class="form-group">
              <label for="">Mức giá tối thiểu áp dụng</label>
              <label
                v-if="errors.min_bill"
                class="form-group text-danger mx-2"
              >{{ errors.min_bill }}</label>
              <input
                v-model="voucher.min_bill"
                type="text"
                class="form-control"
                placeholder="Nhập mức giá..."
              >
            </div>

            <!-- Số lượng -->
            <div class="form-group">
              <label for="">Số lượng</label>
              <label
                v-if="errors.quantity"
                class="form-group text-danger mx-2"
              >{{ errors.quantity }}</label>
              <input
                v-model="voucher.quantity"
                type="text"
                class="form-control"
                placeholder="Nhập số lượng..."
              >
            </div>

            <!-- Trạng thái -->
            <div class="form-group">
              <label for="checkStatus"> Trạng thái </label>
              <input
                v-model="checkStatus"
                class="mx-2"
                type="checkbox"
              >
              <span
                v-if="checkStatus == true"
                class="text-primary ml-1"
              >Kích hoạt</span>
              <span
                v-else
                class="text-danger ml-1"
              >Bị khóa</span>
            </div>

            <!-- Button -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="clearModal"
              >
                Hủy
              </button>
              <button
                v-if="!errors"
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Lưu
              </button>
              <button
                v-else
                type="submit"
                class="btn btn-primary"
              >
                Lưu
              </button>
            </div>
          </form>
          <!-- End Form -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal add sale -->

  <!-- Table Voucher info -->
  <table class="table table-hover my-2">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Mã voucher
        </th>
        <th scope="col">
          Bậc người dùng được sử dụng
        </th>
        <th scope="col">
          Mức giảm (%)
        </th>
        <th scope="col">
          Ngày hết hạn
        </th>
        <th scope="col">
          Mức giá tối thiểu áp dụng
        </th>
        <th scope="col">
          Số lượng
        </th>
        <th scope="col">
          Trạng thái
        </th>
        <th
          scope="col"
          class="w-25 text-center"
        >
          Quản lý
        </th>
      </tr>
    </thead>
    <tbody v-if="vouchers.length > 0">
      <tr
        v-for="voucher in vouchers"
        :key="voucher.id"
      >
        <td>{{ voucher.id }}</td>
        <td>{{ voucher.code }}</td>
        <td v-if="voucher.id_userType == 1">
          Bronze
        </td>
        <td v-else-if="voucher.id_userType == 2">
          Silver
        </td>
        <td v-else>
          Gold
        </td>
        <td>{{ voucher.percent }}</td>
        <td>{{ voucher.expired }}</td>
        <td>{{ voucher.min_bill }}</td>
        <td>{{ voucher.quantity }}</td>
        <td
          v-if="voucher.isActive"
          class="text-primary"
        >
          Kích hoạt
        </td>
        <td
          v-else
          class="text-danger"
        >
          Bị khóa
        </td>
        <td
          v-if="voucher.isActive"
          class="text-center"
        >
          <router-link
            class="btn btn-outline-primary my-2"
            :to="{ name: 'AdminVoucherDetail', params: { id: voucher.id } }"
          >
            Sửa
          </router-link>
          <button
            class="btn btn-outline-danger mx-2 my-2"
            @click="deleteVoucher(voucher.id)"
          >
            Khóa
          </button>
        </td>
        <td
          v-else
          class="text-center"
        >
          <button
            class="btn btn-outline-primary mx-2 my-2"
            @click="deleteVoucher(voucher.id)"
          >
            Mở khóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- End table Voucher Info -->

  <h3
    v-if="vouchers.length == 0"
    class="text-center text-danger"
  >
    Không có voucher!
  </h3>

  <router-link
    :to="{ name: 'AdminHome' }"
    class="btn btn-outline-primary float-right"
  >
    Quay lại
  </router-link>
</template>

<script>
export default {
  name: 'AdminVoucher',
  data() {
    return {
      vouchers: [],
      userTypes: [],
      voucher: {
        code: '',
        id_userType: 1,
        percent: '',
        expired: '',
        min_bill: '',
        quantity: '',
        isActive: ''
      },
      checkStatus: true,
      errors: {}
    }
  },
  beforeMount() {
    this.getAllVouchers(), this.getAllUserTypes()
  },
  methods: {
    async getAllVouchers() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/vouchers',
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
          this.vouchers = resData
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

          await this.getAllVouchers()
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
      if (!this.voucher.code) {
        this.errors.code = 'Mã voucher không được để trống!'
      }
      if (!this.voucher.id_userType) {
        this.errors.id_userType = 'Bậc người dùng không được để trống!'
      }
      if (
        !this.voucher.percent ||
        isNaN(this.voucher.percent) ||
        this.voucher.percent < 0 ||
        this.voucher.percent > 100
      ) {
        this.errors.percent = 'Mức giảm phải là số từ 0 đến 100!'
      }
      if (!this.voucher.expired) {
        this.errors.expired = 'Cần nhập ngày kết thúc!'
      }
      if (!this.voucher.min_bill || isNaN(this.voucher.min_bill)) {
        this.errors.min_bill = 'Cần nhập mức giá tối thiểu là số!'
      }
      if (!this.voucher.quantity || isNaN(this.voucher.quantity)) {
        this.errors.quantity = 'Cần nhập số lượng là số!'
      }
      if (this.checkStatus == true) {
        this.voucher.isActive = 1
      } else {
        this.voucher.isActive = 0
      }
    },
    async addVoucher() {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            'http://book-store-meshop.herokuapp.com/vouchers',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'bookstore-access-token': accessToken,
                'bookstore-refresh-token': refreshToken
              },
              body: JSON.stringify(this.voucher)
            }
          )

          const resData = await res.json()

          if (res.status === 201) {
            this.voucher = {}

            document.getElementById('addVoucherModal').style.display = 'none'
            document.querySelector('.modal-backdrop').remove()
            document.querySelector('.modal-open').style.overflow = 'scroll'

            alert('Thêm voucher thành công!')
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

          this.getAllVouchers()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    clearModal() {
      this.voucher = {}
    },
    async deleteVoucher(id) {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/vouchers/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )
        const resData = res.json()

        const voucherDelete = resData

        if (res.status === 200) {
          voucherDelete.isActive = !voucherDelete.isActive
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

      this.getAllVouchers()
    }
  }
}
</script>

<style></style>
