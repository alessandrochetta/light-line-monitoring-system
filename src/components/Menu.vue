<template>
  <div class="menu">
    <router-link to="plant-model">
      <div class="button-default rounded">
        Plant model
      </div>
    </router-link>
    <router-link to="time-model">
      <div class="button-default rounded">
        Time model
      </div>
    </router-link>
    <router-link to="reason-tree">
      <div class="button-default rounded">
        Reason tree
      </div>
    </router-link>
    <router-link to="counters">
      <div class="button-default rounded">
        Counters
      </div>
    </router-link>
    <router-link to="states">
      <div class="button-default rounded">
        States
      </div>
    </router-link>
    <router-link to="context-fields">
      <div class="button-default rounded">
        Context fields
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: 'Hi'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu{
  padding: 20px;
  text-align: center;
}
</style>
