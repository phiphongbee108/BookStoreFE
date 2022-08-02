<template>
  <h1 class="text-center text-primary">
    Sale
  </h1>

  <!-- Button trigger modal add sale-->
  <button
    type="button"
    class="btn btn-primary float-md-right mb-2"
    data-toggle="modal"
    data-target="#addSaleModal"
  >
    <i class="fas fa-plus" /> Thêm Sale
  </button>
  <!-- Modal add sale -->
  <div
    id="addSaleModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addSaleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="addSaleModalLabel"
            class="modal-title"
          >
            Thông tin Sale
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
          <form @submit.prevent="addSale">
            <!-- Tên sale -->
            <div class="form-group">
              <label for="">Tên Sale</label>
              <label
                v-if="errors.name"
                class="form-group text-danger mx-2"
              >{{
                errors.name
              }}</label>
              <input
                v-model="sale.name"
                type="text"
                class="form-control"
                placeholder="Nhập tên sale..."
              >
            </div>

            <!-- Mức giảm -->
            <div class="form-group">
              <label for="">Mức giảm (%)</label>
              <label
                v-if="errors.percent"
                class="form-group text-danger mx-2"
              >{{ errors.percent }}</label>
              <input
                v-model="sale.percent"
                type="text"
                class="form-control"
                placeholder="Nhập mức giảm..."
              >
            </div>

            <!-- Ngày kết thúc -->
            <div class="form-group">
              <label for="">Ngày kết thúc</label>
              <label
                v-if="errors.endDate"
                class="form-group text-danger mx-2"
              >{{ errors.endDate }}</label>
              <input
                v-model="sale.endDate"
                type="datetime-local"
                class="form-control"
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

  <!-- Table Sale info -->
  <table class="table table-hover">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Tên sale
        </th>
        <th scope="col">
          Mức giảm (%)
        </th>
        <th scope="col">
          Ngày bắt đầu
        </th>
        <th scope="col">
          Ngày kết thúc
        </th>
        <!-- Trạng thái = isActive -->
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
    <tbody v-if="sales.length > 0">
      <tr
        v-for="sale in sales"
        :key="sale.id"
      >
        <td>{{ sale.id }}</td>
        <td>{{ sale.name }}</td>
        <td>{{ sale.percent }}</td>
        <td>{{ sale.created_at }}</td>
        <td>{{ sale.endDate }}</td>
        <td
          v-if="sale.isActive"
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
          v-if="sale.isActive"
          class="text-center"
        >
          <router-link
            class="btn btn-outline-primary my-2"
            :to="{ name: 'AdminSaleDetail', params: { id: sale.id } }"
          >
            Sửa
          </router-link>
          <button
            class="btn btn-outline-danger mx-2 my-2"
            @click="deleteSale(sale.id)"
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
            @click="deleteSale(sale.id)"
          >
            Mở khóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- End table Sale info -->

  <h3
    v-if="sales.length == 0"
    class="text-center text-danger"
  >
    Không có sale!
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
  name: 'AdminSale',
  data() {
    return {
      sales: [],
      sale: {
        name: '',
        percent: '',
        created_at: '',
        endDate: '',
        isActive: ''
      },
      checkStatus: true,
      errors: {}
    }
  },
  beforeMount() {
    this.getAllSales()
  },
  methods: {
    async getAllSales() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/sales',
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
          this.sales = resData
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

          await this.getAllSales()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    validate() {
      this.errors = {}
      if (!this.sale.name) {
        this.errors.name = 'Tên sale không được để trống!'
      }
      if (
        !this.sale.percent ||
        isNaN(this.sale.percent) ||
        this.sale.percent < 0 ||
        this.sale.percent > 100
      ) {
        this.errors.percent = 'Mức giảm phải là số từ 0 đến 100!'
      }
      if (!this.sale.created_at) {
        this.errors.created_at = 'Cần chọn ngày bắt đầu!'
      }
      if (!this.sale.endDate) {
        this.errors.endDate = 'Cần chọn ngày kết thúc!'
      }
      if (this.checkStatus == true) {
        this.sale.isActive = 1
      } else {
        this.sale.isActive = 0
      }
    },
    async addSale() {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            'http://book-store-meshop.herokuapp.com/sales',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'bookstore-access-token': accessToken,
                'bookstore-refresh-token': refreshToken
              },
              body: JSON.stringify(this.sale)
            }
          )

          const resData = await res.json()

          if (res.status === 201) {
            this.sale = {}

            document.getElementById('addSaleModal').style.display = 'none'
            document.querySelector('.modal-backdrop').remove()
            document.querySelector('.modal-open').style.overflow = 'scroll'

            alert('Thêm sale thành công!')
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

          this.getAllSales()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    clearModal() {
      this.sale = {}
    },
    async deleteSale(id) {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/sales/${id}`,
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

        const saleDelete = resData

        if (res.status === 200) {
          saleDelete.isActive = !saleDelete.isActive
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

      this.getAllSales()
    }
  }
}
</script>

<style></style>
