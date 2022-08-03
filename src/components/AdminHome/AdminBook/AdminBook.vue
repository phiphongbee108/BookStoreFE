<template>
  <h1 class="text-center text-primary">
    Sách
  </h1>

  <div>
    <!-- Add book -->
    <div>
      <!-- Button trigger modal add book-->
      <button
        type="button"
        class="btn btn-primary float-right my-2"
        data-toggle="modal"
        data-target="#addBookModal"
      >
        <i class="fas fa-plus" /> Thêm sách
      </button>
      <!-- Modal add book -->
      <div
        id="addBookModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addBookModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <div class="modal-content">
            <div class="text-center">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4
                id="addBookModalLabel"
                class="modal-title"
              >
                Thêm sách
              </h4>
            </div>
            <div class="modal-body">
              <!-- Begin Form -->
              <form
                method="post"
                enctype="multipart/form-data"
                @submit.prevent="validate"
              >
                <div class="row">
                  <div class="col-md-6">
                    <!-- Tên sách -->
                    <div class="form-group">
                      <label for="">Tên sách</label>
                      <br>
                      <label
                        v-if="errors.name"
                        class="form-group text-danger ml-2"
                      >{{ errors.name }}</label>
                      <input
                        v-model="book.name"
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên sách..."
                      >
                    </div>
                    <!-- Hình ảnh -->
                    <div class="form-group">
                      <label for="">Hình ảnh</label>
                      <br>
                      <label
                        v-if="errors.file"
                        class="form-group text-danger ml-2"
                      >{{ errors.file }}</label>
                      <input
                        ref="file"
                        type="file"
                        class="form-control"
                        @change="onImageChange"
                      >
                    </div>

                    <!-- Số lượng -->
                    <div class="form-group">
                      <label for="">Số lượng</label>
                      <br>
                      <label
                        v-if="errors.remain"
                        class="form-group text-danger ml-2"
                      >{{ errors.remain }}</label>
                      <input
                        v-model="book.remain"
                        type="text"
                        class="form-control"
                        placeholder="Nhập số lượng..."
                      >
                    </div>
                    <!-- Giá -->
                    <div class="form-group">
                      <label for="">Giá</label>
                      <br>
                      <label
                        v-if="errors.price"
                        class="form-group text-danger ml-2"
                      >{{ errors.price }}</label>
                      <input
                        v-model="book.price"
                        type="text"
                        class="form-control"
                        placeholder="Nhập giá..."
                      >
                    </div>
                    <!-- Mô tả -->
                    <div class="form-group">
                      <label for="">Mô tả</label>
                      <input
                        v-model="book.description"
                        type="text"
                        class="form-control"
                        placeholder="Nhập mô tả..."
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <!-- Tác giả -->
                    <div class="form-group">
                      <label for="">Tác giả</label>
                      <br>
                      <label
                        v-if="errors.authorName"
                        class="form-group text-danger ml-2"
                      >{{ errors.authorName }}</label>
                      <input
                        v-model="book.authorName"
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên tác giả ..."
                      >
                    </div>
                    <!-- Nhà xuất bản -->
                    <div class="form-group">
                      <label for="">Nhà xuất bản</label>
                      <br>
                      <label
                        v-if="errors.publisherName"
                        class="form-group text-danger ml-2"
                      >{{ errors.publisherName }}</label>
                      <input
                        v-model="book.publisherName"
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên nhà xuất bản..."
                      >
                    </div>
                    <!-- Ngày xuất bản -->
                    <div class="form-group">
                      <label for="">Ngày xuất bản</label>
                      <br>
                      <label
                        v-if="errors.pub_date"
                        class="form-group text-danger ml-2"
                      >{{ errors.pub_date }}</label>
                      <input
                        v-model="book.pub_date"
                        type="datetime-local"
                        class="form-control"
                      >
                    </div>
                    <!-- Danh mục -->
                    <div class="form-group">
                      <label for="selectCategory">Danh mục</label>
                      <br>
                      <label
                        v-if="errors.id_Category"
                        class="form-group text-danger ml-2"
                      >{{ errors.id_Category }}</label>
                      <div class="input-group-prepend ml-2">
                        <select
                          id="selectCategory"
                          v-model="book.id_Category"
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

                    <!-- Trạng thái -->
                    <div class="form-group">
                      <label for="checkStatus"> Trạng thái </label>
                      <input
                        v-model="checkStatus"
                        class="ml-2"
                        type="checkbox"
                      >
                      <br>
                      <span
                        v-if="checkStatus == true"
                        class="ml-1 text-primary"
                      >Còn hàng</span>
                      <span
                        v-else
                        class="ml-1 text-danger"
                      >Hết hàng</span>
                    </div>
                  </div>
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
      <!-- End Modal add book -->
    </div>
  </div>

  <div
    v-if="books.length > 0"
    class="row"
  >
    <!-- Search by text -->
    <div class="col-md-6">
      <form @submit.prevent="searchByText">
        <input
          v-model="searchText"
          class="searchTextInput w-50 my-2"
          type="text"
          placeholder="Nhập từ khóa..."
        >
        <input
          class="searchTextSubmit my-2"
          type="submit"
          value="Tìm kiếm"
        >
      </form>
      <label
        v-if="errors.searchByText"
        class="text-danger mb-0"
      >{{
        errors.searchByText
      }}</label>
    </div>

    <!-- Search by category -->
    <div class="col-md-6">
      <form @submit.prevent="searchByCategory">
        <div class="input-group-prepend">
          <select
            id="selectCategory"
            v-model="searchIdCategory"
            class="custom-select w-50 my-2"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <input
            type="submit"
            class="my-2"
            value="Tìm kiếm"
          >
        </div>
      </form>
    </div>
  </div>

  <!-- Table Book Info -->
  <table class="table table-hover my-2">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Tên sách
        </th>
        <th
          scope="col"
          class="col-md-1 col-sm-1"
        >
          Hình ảnh
        </th>
        <th scope="col">
          Danh mục
        </th>
        <th scope="col">
          Số lượng
        </th>
        <!-- Trạng thái = isActive -->
        <th scope="col">
          Trạng thái
        </th>
        <th
          scope="col"
          class="text-center"
        >
          Quản lý
        </th>
      </tr>
    </thead>
    <tbody v-if="books.length > 0">
      <AdminBookItem
        v-for="book in paginatedData"
        :key="book.id"
        :book-props="book"
        @delete-book="deleteBook"
      />
    </tbody>
  </table>
  <!-- End Table Book Info -->

  <!-- Pagination -->
  <div
    v-if="books.length > 0"
    class="d-flex justify-content-center"
  >
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          v-if="page > 1"
          class="page-item"
        >
          <a
            class="page-link btn"
            href="#"
            @click="firstPage"
          > &lt;&lt; </a>
        </li>
        <li
          v-if="page > 1"
          class="page-item"
        >
          <a
            class="page-link btn"
            href="#"
            @click="backPage"
          > &lt; </a>
        </li>
        <li
          v-for="item in Math.ceil(data.length / perPage)"
          :key="item"
          class="page-item"
        >
          <a
            class="page-link btn"
            href="#"
            @click="() => goToPage(item)"
          >
            {{ item }}
          </a>
        </li>
        <li
          v-if="page < Math.ceil(data.length / perPage)"
          class="page-item"
        >
          <a
            class="page-link btn"
            href="#"
            @click="nextPage"
          > &gt; </a>
        </li>
        <li
          v-if="page < Math.ceil(data.length / perPage)"
          class="page-item"
        >
          <a
            class="page-link btn"
            href="#"
            @click="lastPage"
          > &gt;&gt; </a>
        </li>
      </ul>
    </nav>
  </div>

  <h3
    v-if="books.length == 0"
    class="text-center text-danger"
  >
    Không có sách!
  </h3>

  <router-link
    :to="{ name: 'AdminHome' }"
    class="btn btn-outline-primary float-right"
  >
    Quay lại
  </router-link>
</template>

<script>
import { computed } from 'vue'
import axios from 'axios'

import AdminBookItem from './AdminBookItem/AdminBookItem.vue'

export default {
  name: 'AdminBook',
  components: {
    AdminBookItem
  },
  data() {
    return {
      errors: {},
      book: {
        name: '',
        photo: null,
        categoryName: '',
        id_Category: '',
        remain: '',
        price: null,
        status: 1,
        authorName: '',
        publisherName: '',
        pub_date: null,
        description: ''
      },
      searchText: '',
      searchIdCategory: 8,
      books: [],
      categories: [],
      checkStatus: true,
      file: null,
      formData: new FormData(),
      data: [],
      paginatedData: null,
      perPage: 4,
      page: 1
    }
  },
  beforeMount() {
    this.getAllBooks(), this.getAllCategories()
  },
  methods: {
    onImageChange(event) {
      this.file = event.target.files[0]
      this.book.photo = this.file.name
    },
    validate() {
      this.errors = {}
      if (!this.book.name) {
        this.errors.name = 'Cần nhập tên sách!'
      }
      if (!this.file) {
        this.errors.file = 'Cần chọn hình ảnh!'
      }
      if (!this.book.id_Category) {
        this.errors.id_Category = 'Cần chọn danh mục!'
      }
      if (!this.book.remain || isNaN(this.book.remain)) {
        this.errors.remain = 'Cần nhập số lượng là số!'
      }
      if (!this.book.price || isNaN(this.book.price)) {
        this.errors.price = 'Cần nhập giá là số!'
      }
      if (!this.book.authorName) {
        this.errors.authorName = 'Cần nhập tên tác giả!'
      }
      if (!this.book.publisherName) {
        this.errors.publisherName = 'Cần nhập tên nhà xuất bản!'
      }
      if (this.checkStatus == true) {
        this.book.status = 1
      } else {
        this.book.status = 0
      }
      if (!this.book.pub_date) {
        this.errors.pub_date = 'Cần chọn ngày xuất bản!'
      }

      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        this.formData.append('photo', this.file)
        this.formData.append('name', this.book.name)
        this.formData.append('id_Category', this.book.id_Category)
        this.formData.append('remain', this.book.remain)
        this.formData.append('price', this.book.price)
        this.formData.append('status', this.book.status)
        this.formData.append('authorName', this.book.authorName)
        this.formData.append('publisherName', this.book.publisherName)
        this.formData.append('pub_date', this.book.pub_date)
        this.formData.append('description', this.book.description)

        this.addBook()
      }
    },

    async searchByText() {
      this.errors.searchByText = ''
      if (!this.searchText) {
        this.errors.searchByText = 'Từ khóa tìm kiếm không được để trống!'
      } else {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            ` http://book-store-meshop.herokuapp.com/admin/books/search/${this.searchText}`,
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
            this.books = resData
            this.handlePagination()
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

            await this.searchByText()
          }
        } catch (error) {
          alert(error.message)
        }
      }
    },

    async searchByCategory() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          ` http://book-store-meshop.herokuapp.com/admin/books/category/${this.searchIdCategory}`,
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
          this.books = resData
          this.handlePagination()
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

          await this.searchByCategory()
        }
      } catch (error) {
        alert(error.message)
      }
    },

    async getAllBooks() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/admin/books',
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
          this.books = resData
          this.handlePagination()
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

          await this.getAllBooks()
        }
      } catch (error) {
        alert(error.message)
      }
    },

    handlePagination() {
      this.page = 1

      this.data = this.books.map(item => {
        return {
          id: item.id,
          name: item.name,
          imgPath: item.imgPath,
          category: item.category,
          remain: item.remain,
          price: item.price,
          status: item.status,
          author: item.author,
          publisher: item.publisher,
          pub_date: item.pub_date,
          description: item.description,
          isActive: item.isActive
        }
      })

      this.paginatedData = computed(() =>
        this.data.slice(
          (this.page - 1) * this.perPage,
          this.page * this.perPage
        )
      )

      this.nextPage = () => {
        if (this.page !== Math.ceil(this.data.length / this.perPage)) {
          this.page += 1
        }
      }

      this.backPage = () => {
        if (this.page !== 1) {
          this.page -= 1
        }
      }

      this.firstPage = () => {
        if (this.page > 1) {
          this.page = 1
        }
      }

      this.lastPage = () => {
        if (this.page < Math.ceil(this.data.length / this.perPage)) {
          this.page = Math.ceil(this.data.length / this.perPage)
        }
      }

      this.goToPage = numPage => {
        this.page = numPage
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
    },

    async addBook() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await axios.post(
          'http://book-store-meshop.herokuapp.com/books',
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

        if (res.status === 201) {
          this.book = {}
          this.$refs.file.value = null
          this.file = null
          this.formData = new FormData()

          document.getElementById('addBookModal').style.display = 'none'
          document.querySelector('.modal-backdrop').remove()
          document.querySelector('.modal-open').style.overflow = 'scroll'

          alert('Thêm sách thành công!')
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

        this.getAllBooks()
      } catch (error) {
        alert(error.message)
      }
    },

    clearModal() {
      this.book = {}
      this.$refs.file.value = null
      this.file = null
      this.formData = new FormData()
    },

    async deleteBook(id) {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/books/${id}`,
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

        const bookDelete = resData

        if (res.status === 200) {
          bookDelete.isActive = !bookDelete.isActive
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

      this.getAllBooks()
    }
  }
}
</script>

<style scoped>
.searchTextInput,
.searchTextSubmit {
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 1rem;
}

@media only screen and (min-width: 768px) {
  .modal-content {
    width: 150% !important;
    margin-left: -25%;
  }
}
</style>
