<template>
  <div
    v-if="errors.name"
    class="text-danger"
  >
    {{ errors.name }}
  </div>
  <form
    method="post"
    @submit.prevent="validate"
  >
    <input
      v-model="category.name"
      type="text"
      placeholder="Danh mục mới..."
    >
    <input
      type="submit"
      value="Thêm"
    >
  </form>
</template>

<script>
export default {
  name: 'AdminAddCategory',
  emits: ['add-category'],
  data() {
    return {
      errors: {},
      category: {
        name: ''
      }
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.category.name) {
        this.errors.name = 'Tên danh mục không được để trống!'
      }

      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        this.addItem()
      }
    },

    async addItem() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/categories',
          {
            method: 'POST',
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
          this.category.name = ''
          this.$emit('add-category', this.category)
          alert('Thêm danh mục dùng thành công!')
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
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
}

input[type='text'] {
  flex: 10;
  padding: 5px;
}

input[type='submit'] {
  flex: 2;
}
</style>
