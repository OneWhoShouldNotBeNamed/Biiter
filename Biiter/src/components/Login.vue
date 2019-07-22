<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import router from '../router'
// import EventBus from './EventBus'
import ApiService from "@/common/api.service";

export default {
  data () {
    return {
      email: '',
      password: '',
      logResp:''
    }
  },

  methods: {
   async login () {
     this.logResp = await ApiService.post('user/login',
        {
          email: this.email,
          password: this.password
        }
      );
      console.log(this.logResp)
      localStorage.setItem('usertoken',this.logResp)
      router.push('AddBeats')
      
    }
  }
}
</script>
