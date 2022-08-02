<template>
  <div class="comtainer">
    <h1 class="text-center text-primary">
      Chi tiết sách
    </h1>
    <div class="row">
      <!-- Detail -->
      <div class="col-md-3 col-sm-12">
        <img
          class="imgBookDetail"
          :src="bookDetail.imgPath"
          alt="{{bookDetail.name}}"
        >
      </div>
      <div class="col-md-9 card">
        <div class="card-body">
          <h5 class="card-title">
            {{ bookDetail.name }}
          </h5>
          <ul>
            <li>Id: {{ bookDetail.id }}</li>
            <li>Danh mục: {{ bookDetail.category }}</li>
            <li>Mô tả: {{ bookDetail.description }}</li>
            <li>Giá: {{ bookDetail.price }}</li>
            <li>Số lượng: {{ bookDetail.remain }}</li>
            <li>Tác giả: {{ bookDetail.authorName }}</li>
            <li>Nhà xuất bản: {{ bookDetail.publisherName }}</li>
            <li>Ngày xuất bản: {{ bookDetail.pub_date }}</li>
            <li>Đánh giá: {{ bookDetail.rating }}</li>
            <li v-if="bookDetail.status">
              Trạng thái: Còn hàng
            </li>
            <li v-else>
              Trạng thái: Hết hàng
            </li>
          </ul>
        </div>

        <!-- Button trigger modal edit book -->
        <button
          type="button"
          class="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#editBookModal"
        >
          Sửa thông tin sách
        </button>

        <!-- Modal edit book -->
        <div
          id="editBookModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editBookModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  id="editBookModalLabel"
                  class="modal-title"
                >
                  Thông tin sách
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
              <!-- Begin Form -->
              <div class="modal-body">
                <form
                  method="post"
                  enctype="multipart/form-data"
                  @submit.prevent="validate"
                >
                  <!-- Tên sách -->
                  <div class="form-group">
                    <label for="">Tên sách</label>
                    <label
                      v-if="errors.name"
                      class="form-group text-danger ml-2"
                    >{{ errors.name }}</label>
                    <input
                      v-model="bookDetail.name"
                      type="text"
                      class="form-control"
                      placeholder="Nhập tên sách..."
                    >
                  </div>
                  <!-- Hình ảnh -->
                  <div class="form-group">
                    <label for="">Hình ảnh</label>

                    <input
                      ref="file"
                      type="file"
                      class="form-control"
                      @change="onImageChange"
                    >
                  </div>
                  <!-- Danh mục -->
                  <div class="form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label
                          class="input-group-text"
                          for="selectCategory"
                        >Danh mục</label>
                        <label
                          v-if="errors.category"
                          class="form-group text-danger ml-2"
                        >{{ errors.category }}</label>
                        <select
                          id="selectCategory"
                          v-model="bookDetail.id_Category"
                          class="custom-select"
                        >
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                          >
                            {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- Số lượng -->
                  <div class="form-group">
                    <label for="">Số lượng</label>
                    <label
                      v-if="errors.remain"
                      class="form-group text-danger ml-2"
                    >{{ errors.remain }}</label>
                    <input
                      v-model="bookDetail.remain"
                      type="text"
                      class="form-control"
                      placeholder="Nhập số lượng..."
                    >
                  </div>
                  <!-- Giá -->
                  <div class="form-group">
                    <label for="">Giá</label>
                    <label
                      v-if="errors.price"
                      class="form-group text-danger ml-2"
                    >{{ errors.price }}</label>
                    <input
                      v-model="bookDetail.price"
                      type="text"
                      class="form-control"
                      placeholder="Nhập giá..."
                    >
                  </div>
                  <!-- Trạng thái -->
                  <div class="form-group">
                    <label for="checkStatus"> Trạng thái </label>
                    <input
                      id="checkStatus"
                      v-model="checkStatus"
                      class="ml-2"
                      type="checkbox"
                    >
                    <span
                      v-if="checkStatus == true"
                      class="ml-1 text-primary"
                    >Còn hàng</span>
                    <span
                      v-else
                      class="ml-1 text-danger"
                    >Hết hàng</span>
                  </div>
                  <!-- Tác giả -->
                  <div class="form-group">
                    <label for="">Tác giả</label>
                    <label
                      v-if="errors.authorName"
                      class="form-group text-danger ml-2"
                    >{{ errors.authorName }}</label>
                    <input
                      v-model="bookDetail.authorName"
                      type="text"
                      class="form-control"
                      placeholder="Nhập tên tác giả ..."
                    >
                  </div>
                  <!-- Nhà xuất bản -->
                  <div class="form-group">
                    <label for="">Nhà xuất bản</label>
                    <label
                      v-if="errors.publisherName"
                      class="form-group text-danger ml-2"
                    >{{ errors.publisherName }}</label>
                    <input
                      v-model="bookDetail.publisherName"
                      type="text"
                      class="form-control"
                      placeholder="Nhập tên nhà xuất bản..."
                    >
                  </div>
                  <!-- Ngày xuất bản -->
                  <div class="form-group">
                    <label for="">Ngày xuất bản</label>
                    <label
                      v-if="errors.pub_date"
                      class="form-group text-danger ml-2"
                    >{{ errors.pub_date }}</label>
                    <input
                      v-model="bookDetail.pub_date"
                      type="text"
                      class="form-control"
                    >
                  </div>
                  <!-- Mô tả -->
                  <div class="form-group">
                    <label for="">Mô tả</label>

                    <input
                      v-model="bookDetail.description"
                      type="text"
                      class="form-control"
                      placeholder="Nhập mô tả..."
                    >
                  </div>
                  <!-- Button -->
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
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
              </div>
              <!-- End Form -->
            </div>
          </div>
        </div>
        <!-- End Modal -->
      </div>
    </div>

    <router-link
      :to="{ name: 'AdminBook' }"
      class="btn btn-outline-primary float-right my-2"
    >
      Quay lại
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminBookDetail',
  data() {
    return {
      bookDetail: {},
      bookId: null,
      categories: [],
      checkStatus: true,
      file: null,
      formData: new FormData(),
      errors: {}
    }
  },
  async beforeMount() {
    this.getOneBook(), this.getAllCategories()
  },
  methods: {
    onImageChange(event) {
      this.file = event.target.files[0]
      this.bookDetail.photo = this.file.name
    },
    validate() {
      this.errors = {}
      if (!this.bookDetail.name) {
        this.errors.name = 'Cần nhập tên sách!'
      }

      if (!this.bookDetail.id_Category) {
        this.errors.id_Category = 'Cần chọn danh mục!'
      }
      if (!this.bookDetail.remain || isNaN(this.bookDetail.remain)) {
        this.errors.remain = 'Cần nhập số lượng là số!'
      }
      if (!this.bookDetail.price || isNaN(this.bookDetail.price)) {
        this.errors.price = 'Cần nhập giá là số!'
      }
      if (!this.bookDetail.authorName) {
        this.errors.authorName = 'Cần nhập tên tác giả!'
      }
      if (!this.bookDetail.publisherName) {
        this.errors.publisherName = 'Cần nhập tên nhà xuất bản!'
      }
      if (this.checkStatus == true) {
        this.bookDetail.status = 1
      } else {
        this.bookDetail.status = 0
      }
      if (!this.bookDetail.pub_date) {
        this.errors.pub_date = 'Cần nhập ngày xuất bản dạng yyyy-mm-dd!'
      }

      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        this.formData.append('photo', this.file)
        this.formData.append('name', this.bookDetail.name)
        this.formData.append('id_Category', this.bookDetail.id_Category)
        this.formData.append('remain', this.bookDetail.remain)
        this.formData.append('price', this.bookDetail.price)
        this.formData.append('status', this.bookDetail.status)
        this.formData.append('authorName', this.bookDetail.authorName)
        this.formData.append('publisherName', this.bookDetail.publisherName)
        this.formData.append('pub_date', this.bookDetail.pub_date)
        this.formData.append('description', this.bookDetail.description)

        this.editBook(this.bookDetail.id)
      }
    },
    async editBook(id) {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await axios.put(
          `http://book-store-meshop.herokuapp.com/books/${id}`,
          this.formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )

        const resData = await res.data
        this.bookDetail = resData

        if (res.status === 200) {
          this.bookDetail = {}
          this.$refs.file.value = null
          this.file = null
          this.formData = new FormData()

          document.getElementById('editBookModal').style.display = 'none'
          document.querySelector('.modal-backdrop').remove()
          document.querySelector('.modal-open').style.overflow = 'scroll'

          alert('Sửa thông tin sách thành công!')
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

      this.getOneBook()
    },
    async getOneBook() {
      this.bookId = this.$route.params.id

      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/admin/book/${this.bookId}`,
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
          this.bookDetail = resData
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

          await this.getOneBook()
        }
      } catch (error) {
        alert(error.message)
      }
    },
    async getAllCategories() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value
      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/admin/categories',
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
          this.categories = resData
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

          await this.getAllCategories()
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
.imgBookDetail {
  width: 100%;
}
</style>
