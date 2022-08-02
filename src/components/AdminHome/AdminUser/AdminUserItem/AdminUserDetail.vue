<template>
  <h2 class="text-center text-primary">
    Sửa thông tin người dùng
  </h2>
  <h3 class="text-center text-danger">
    {{ userDetail.username }}
  </h3>
  <!-- Begin Form -->
  <form
    class="w-50 mx-auto"
    @submit.prevent="editUser(userId)"
  >
    <!-- Trạng thái  -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Trạng thái</label>
      <br>
      <input
        v-model="checkStatus"
        class="ml-2"
        type="checkbox"
      >
      <span
        v-if="checkStatus == true"
        class="ml-1 text-primary"
      >Kích hoạt</span>
      <span
        v-else
        class="ml-1 text-danger"
      >Bị khóa</span>
    </div>
    <!-- Xếp hạng  -->
    <div class="form-group">
      <label
        for=""
        class="text-primary"
      >Xếp hạng</label>

      <label
        v-if="errors.id_userType"
        class="form-group text-danger ml-2"
      >{{
        errors.id_userType
      }}</label>

      <select
        id="selectUserType"
        v-model="userDetail.id_userType"
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

    <button
      type="submit"
      class="btn btn-primary"
    >
      Sửa
    </button>
    <br>
    <router-link
      to="/admin-user"
      class="btn btn-outline-primary float-right"
    >
      Quay lại
    </router-link>
  </form>
  <!-- End Form -->
</template>

<script>
export default {
  name: 'AdminUserDetail',
  data() {
    return {
      userId: null,
      userDetail: {},
      userTypes: [],
      checkStatus: '',
      errors: {}
    }
  },
  beforeMount() {
    this.getOneUser(), this.getAllUserTypes()
  },
  methods: {
    async getOneUser() {
      this.userId = this.$route.params.id

      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/user/${this.userId}`,
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
          this.userDetail = resData

          if (this.userDetail.status == 1) {
            this.checkStatus = true
          } else {
            this.checkStatus = false
          }
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

          await this.getOneUser()
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

      if (this.checkStatus == true) {
        this.userDetail.status = 1
      } else {
        this.userDetail.status = 0
      }
    },
    async editUser(id) {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (checkError.length === 0) {
        const acCookie = await window.cookieStore.get('accessToken')
        const rfCookie = await window.cookieStore.get('refreshToken')
        const accessToken = acCookie.value
        const refreshToken = rfCookie.value

        try {
          const res = await fetch(
            `http://book-store-meshop.herokuapp.com/users/${id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'bookstore-access-token': accessToken,
                'bookstore-refresh-token': refreshToken
              },
              body: JSON.stringify(this.userDetail)
            }
          )

          const resData = await res.json()

          if (res.status === 200) {
            this.userDetail = resData
            alert('Sửa thông tin người dùng thành công!')
            this.$router.push('/admin-user')
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

        this.getOneUser()
      }
    }
  }
}
</script>

<style></style>
