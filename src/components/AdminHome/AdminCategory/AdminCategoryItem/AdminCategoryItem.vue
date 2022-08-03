<template>
  <tr>
    <td>{{ categoryProps.id }}</td>
    <td>{{ categoryProps.name }}</td>
    <td
      v-if="categoryProps.isActive"
      class="text-primary"
    >
      Kích hoạt
    </td>
    <td
      v-else
      class="text-danger"
    >
      Bị Khóa
    </td>
    <td class="d-flex justify-content-center">
      <button
        v-if="categoryProps.isActive"
        ref="editBtn"
        class="btn btn-outline-info my-2"
        data-toggle="modal"
        :data-target="'#editModal-' + categoryProps.id"
      >
        Sửa
      </button>
      <button
        v-if="categoryProps.isActive"
        class="btn btn-outline-danger mx-2 my-2"
        @click="deleteItem"
      >
        Khóa
      </button>
      <button
        v-else
        class="btn btn-outline-primary mx-2 my-2"
        @click="deleteItem"
      >
        Mở khóa
      </button>
    </td>
    <!-- Edit Modal -->
    <div
      :id="'editModal-' + categoryProps.id"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="editModalLabel"
              class="modal-title"
            >
              Sửa danh mục
            </h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <!-- Begin form -->
          <form
            class="modal-body"
            @submit.prevent="validate"
          >
            <div
              v-if="errors.name"
              class="form-group text-danger"
            >
              <label>{{ errors.name }}</label>
            </div>
            <div class="form-group">
              <label>Tên danh mục</label>
              <input
                id="name"
                v-model="category.name"
                type="text"
                name="name"
                class="w-100"
                placeholder="Nhập tên danh mục..."
                @blur="validate"
              >
            </div>
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
                data-dismiss="modal"
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
      </div>
    </div>
  </tr>
</template>

<script>
export default {
  name: 'AdminCategoryItem',
  props: ['categoryProps'],
  setup(props, context) {
    const deleteItem = () => {
      context.emit('delete-category', props.categoryProps.id)
    }
    return {
      deleteItem
    }
  },
  data() {
    return {
      id: null,
      errors: {},
      category: {
        name: ''
      }
    }
  },
  beforeMount() {
    this.getOneCate()
  },
  methods: {
    getOneCate() {
      this.category.name = this.categoryProps.name
    },
    validate() {
      this.errors = {}
      if (!this.category.name) {
        this.errors.name = 'Tên danh mục không được để trống!'
      }
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        this.editItem(this.categoryProps.id)
      }
    },
    async editItem(id) {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/categories/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            },
            body: JSON.stringify(this.category)
          }
        )

        const resData = await res.json()

        if (res.status === 200) {
          document.getElementById(
            'editModal-' + this.categoryProps.id
          ).style.display = 'none'
          document.querySelector('.modal-backdrop').remove()
          document.querySelector('.modal-open').style.overflow = 'scroll'

          alert('Sửa danh mục thành công!')
        }

        if (res.status === 404 || res.status === 500) {
          alert(resData.message)
        }

        if (
          res.status == 401 &&
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

        this.category.name = ''
        this.$emit('edit-category', this.category)
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style></style>
