<script setup>
import { RouterView } from 'vue-router'
import AdminMenu from './components/AdminHome/AdminMenu.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <AdminMenu />
      </div>
      <div class="col-md-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style></style>
