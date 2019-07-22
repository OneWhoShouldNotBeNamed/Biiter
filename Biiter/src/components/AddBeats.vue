<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Add Beats</h1>
          <div class="form-group">
            <label for="Beat"></label>
            <input type="text" v-model="beat" class="form-control" name="beat" placeholder="Beat it!!! Just Beat it!!!">
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Beat it!</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import router from '../router'
import jwt from 'jwt-decode'
import ApiService from "@/common/api.service";

export default {
  data () {
    return {
      beat: '',
      uid: ''
    }
  },
  beforeCreate(){
    console.log(localStorage.getItem('usertoken'))
    if (!localStorage.getItem('usertoken')){      
     router.push('Login')
    }
    let jwtKey = 'secretk3y';
    let auth_id = req.headers['authorization'].split(' ')[1]
    console.log(auth_id,jwtKey)
    if(!jwt.verify(auth_id, jwtKey))
    {
      router.push('Login')
    }
  },

  methods: {
    register () {
      ApiService.post('/user/addbeat',
        {
          beat: this.beat
        }
      ).then((res) => {
        console.log(res)
        router.push({ name: 'ViewBeats' })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

}
</script>
