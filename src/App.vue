<template>
  <div id="app">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name: 'App',
  components: {Menu}
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #2c3e50;
}

body{
  margin: 0
}

/* unvisited link */
a:link {
    text-decoration: none;
    color: inherit;
}

/* visited link */
a:visited {
    text-decoration: none;
    color: inherit;
}

/* mouse over link */
a:hover {
    text-decoration: none;
    color: inherit;
}

/* selected link */
a:active {
    text-decoration: none;
    color: inherit;
}

.pointer{
  cursor: pointer;
}

.button-default{
  padding: 10px 20px;
  display: inline-block;
  cursor: pointer;
}

.button-default:hover{
  background-color: whitesmoke;
}

.router-link-active .button-default{
  background-color: whitesmoke;
}

.rounded{
  border-radius: 4px;
}

.col5050{
  float: left;
  width: 50%;
  box-sizing: border-box;
  padding: 0 10px;
}

.clear{
  clear: both;
}

.full-width{
  width: 100%;
}

.visible{
  display: block;
}

.nonVisible{
  display: none;
}

.align-center{
  text-align: center;
}

.align-right{
  text-align: right;
}

.row-button{
  height: 16px !important;
  padding: 0px 5px !important;
  font-size: 9pt !important;
  margin: 0 5px !important;
}

.color-picker{
  vertical-align: middle !important;
}

.el-color-picker__trigger{
  width: 100% !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.color-picker{
  width: 100%;
}
</style>
