<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image" />
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-primary mb-4">
                      Đăng nhập
                    </h1>
                  </div>
                  <!-- Begin form -->
                  <form
                    class="user"
                    @submit.prevent="login"
                  >
                    <div class="form-group">
                      <label
                        v-if="errors.username"
                        class="form-group text-danger my-2"
                      >{{ errors.username }}</label>
                      <input
                        id="exampleInputEmail"
                        v-model="admin.username"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="Nhập tài khoản admin..."
                      >
                    </div>
                    <div class="form-group">
                      <label
                        v-if="errors.password"
                        class="form-group text-danger my-2"
                      >{{ errors.password }}</label>
                      <input
                        id="exampleInputPassword"
                        v-model="admin.password"
                        type="password"
                        class="form-control form-control-user"
                        placeholder="Nhập mật khẩu"
                      >
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input
                          id="customCheck"
                          type="checkbox"
                          class="custom-control-input"
                        >
                        <label
                          class="custom-control-label"
                          for="customCheck"
                        >Lưu đăng nhập</label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Đăng nhập
                    </button>
                    <hr>
                    <a
                      href="#"
                      class="btn btn-outline-danger btn-user btn-block"
                    >
                      <i class="fab fa-google fa-fw" /> Đăng nhập với Google
                    </a>
                    <a
                      href="#"
                      class="btn btn-outline-primary btn-user btn-block"
                    >
                      <i class="fab fa-facebook-f fa-fw" /> Đăng nhập với
                      Facebook
                    </a>
                  </form>
                  <!-- End form -->
                  <hr>
                  <div class="text-center">
                    <a
                      class="small"
                      href="#"
                    >Quên mật khẩu?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminLogin',
  data() {
    return {
      admin: {
        loginType: 0
      },
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {}
      this.validateName()
      this.validatePassword()
    },
    validateName() {
      if (!this.admin.username) {
        this.errors.username = 'Tên đăng nhập không được để trống!'
      }
    },
    validatePassword() {
      if (!this.admin.password) {
        this.errors.password = 'Mật khẩu không được để trống!'
      }
    },
    async login() {
      this.validate()
      const checkError = Object.keys(this.errors)
      if (!checkError.length) {
        const res = await axios.post(
          'http://book-store-meshop.herokuapp.com/login',
          this.admin
        )

        const resData = await res.data

        if (res.status == 200) {
          let d = new Date()
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
          let expires = 'expires=' + d.toUTCString()
          document.cookie =
            'accessToken=' +
            resData.accessToken +
            ';' +
            expires +
            ';path=/' +
            ';secure'
          document.cookie =
            'refreshToken=' +
            resData.refreshToken +
            ';' +
            expires +
            ';path=/' +
            ';secure'
          this.$router.push('/')
        }

        if (res.status === 404 || res.status === 500) {
          alert(resData.message)
        }
      }
    }
  }
}
</script>

<style></style>
