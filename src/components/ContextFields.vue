<template>
  <div class="context-fields">
    <el-dialog
    title="Error"
    :visible.sync="showMessage"
    width="30%">
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="showMessage = false">Ok</el-button>
    </span>
  </el-dialog>
    <div class="action-bar">
      <el-button type="primary" v-if="!currentNode" v-on:click="() => setCurrentNode(undefined)" icon="el-icon-plus" plain>Add context field</el-button>
    </div>
    <div class="node-manipulation rounded" v-if="currentNode" @keyup.enter="saveCurrentNode">
      <div class="input-row col5050">
        <el-input placeholder="Context field name" v-model="currentNode.name">
          <template slot="prepend">Context field name</template>
        </el-input>
      </div>
      <div class="input-row col5050">
        <el-input placeholder="Default value" v-model="currentNode.defaultValue">
          <template slot="prepend">Default value</template>
        </el-input>
      </div>

      <div class="input-row col5050">
        <el-input placeholder="Unit of measure" v-model="currentNode.uom">
          <template slot="prepend">Unit of measure</template>
        </el-input>
      </div>
      <div class="input-row col5050">
        <el-select v-model="currentNode.magnitude" placeholder="Magnitude" class="full-width">
          <el-option
            v-for="m in magnitudes"
            :key="m"
            :label="m"
            :value="m">
          </el-option>
        </el-select>
      </div>

      <div class="clear"></div>
      <div class="action-bar">
        <el-button type="primary" v-on:click="saveCurrentNode">{{currentNode.id === -1 ? "Save" : "Save changes"}}</el-button>
        <el-button type="danger" v-on:click="cancelCurrentNode" plain>Cancel</el-button>
        <el-button type="danger" v-if="currentNode.id !== -1" v-on:click="deleteCurrentNode">{{currentNode.askDeleteConfirmation ? Constants.view.deleteConfirmationMessageQuestion : "Delete"}}</el-button>
      </div>
    </div>
    <div class="list-container">
      <div v-for="node in contextFields" v-bind:key="node.id" class="list-row pointer">
        <div class="col5050">
          <span>{{node.name}}</span>
        </div>
        <div class="col5050 action-bar-node">
          <span class="cursor" ><el-button class="row-button" plain icon="el-icon-edit" type="primary" v-on:click.stop="() => setCurrentNode(node)">Edit</el-button></span>
          <span class="cursor" ><el-button class="row-button" plain icon="el-icon-close" type="danger" v-on:click.stop="() => deleteNode(node)">{{node.askDeleteConfirmation ? Constants.view.deleteConfirmationMessageQuestion : "Delete"}}</el-button></span>
          <span v-if="node.askDeleteConfirmation" class="cursor" ><el-button class="row-button" plain type="default" v-on:click.stop="() => cancelNodeDeltion(node)">Cancel deletion</el-button></span>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {Constants} from '../constants/main'

export default {
  name: 'ContextFields',
  data () {
    return {
      currentNode: undefined,
      message: '',
      showMessage: false,
      Constants: Constants
    }
  },
  computed: {
    ...mapGetters([
      'contextFields',
      'magnitudes'
    ])
  },
  methods: {
    ...mapActions([
      'saveContextField',
      'editContextField',
      'deleteContextField'
    ]),
    setCurrentNode: function (node) {
      if (node === undefined) {
        this.currentNode = {
          id: -1,
          name: '',
          uom: '',
          magnitude: undefined
        }
      }
      else {
        this.currentNode = JSON.parse(JSON.stringify(node))
        this.currentNode.askDeleteConfirmation = false
      }
    },
    saveCurrentNode: function () {
      if (!this.validateNode()) {
        return
      }
      if (this.currentNode.id === -1) {
        let nodeToInsert = JSON.parse(JSON.stringify(this.currentNode))
        nodeToInsert.id = Math.random()
        this.saveContextField(nodeToInsert)
      }
      else {
        this.editContextField(JSON.parse(JSON.stringify(this.currentNode)))
        this.currentNode = undefined
      }
    },
    cancelCurrentNode: function () {
      this.currentNode = undefined
    },
    deleteCurrentNode: function () {
      if (!this.currentNode.askDeleteConfirmation) {
        this.currentNode.askDeleteConfirmation = true
        this.$forceUpdate();
      }
      else {
        this.deleteContextField(JSON.parse(JSON.stringify(this.currentNode)))
        this.currentNode = undefined
      }
    },
    deleteNode: function (node) {
      if (!node.askDeleteConfirmation) {
        node.askDeleteConfirmation = true
        this.$forceUpdate();
      }
      else {
        this.deleteContextField(JSON.parse(JSON.stringify(node)))
      }
    },
    cancelNodeDeltion: function (node) {
      node.askDeleteConfirmation = false
      this.$forceUpdate();
    },
    validateNode: function() {
      let localMessage = 'Fields '
      let error = false
      if (this.currentNode.name.length === 0) {
        localMessage += 'Name '
        error = true
      }
      localMessage += 'are mandatory.'
      if (error) {
        this.message = localMessage
        this.showMessage = true
        return false
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container{
  width: calc(80% + 40px);
  margin: 0 auto;
  padding: 20px 0;
}
.list-row{
   padding: 5px 0;
   border-radius: 4px;
}
.list-row:hover {
  background-color: whitesmoke
}
.list-row:hover .action-bar-node{
  display: block;
}
.action-bar{
  text-align: center;
}
.action-bar-node{
  display: none
}
.node-manipulation{
  width: 80%;
  margin: 0 auto;
  background-color: whitesmoke;
  padding: 20px;
}
.input-row{
  padding: 10px;
  box-sizing: border-box;
}
.color-display{
  display: inline-block;
  width: 40px;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
