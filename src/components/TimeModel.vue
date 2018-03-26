<template>
  <div class="time-model">
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
      <el-button type="primary" v-if="!currentNode" v-on:click="() => setCurrentNode(undefined)" icon="el-icon-plus" plain>Add time slot</el-button>
    </div>
    <div class="node-manipulation rounded" v-if="currentNode" @keyup.enter="saveCurrentNode">
      <div class="input-row col5050">
        <el-input placeholder="Time slot name" v-model="currentNode.name">
          <template slot="prepend">Time slot name</template>
        </el-input>
      </div>
      <div class="input-row col5050">
        <el-select v-model="currentNode.location" placeholder="Location" class="full-width" v-bind:disabled="currentNode.nodes.length > 0">
          <el-option
            v-for="node in timeModelSerialized"
            v-if="currentNode.id !== node.id"
            :key="node.id"
            :label="node.name"
            :value="node.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-row col5050">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">Color</div>
          <el-color-picker v-model="currentNode.color" v-on:active-change="(c) => currentNode.color = c" class="color-picker"></el-color-picker>
        </div>
      </div>
      <div class="clear"></div>
      <div class="action-bar">
        <el-button type="primary" v-on:click="saveCurrentNode">{{currentNode.id === -1 ? "Save" : "Save changes"}}</el-button>
        <el-button type="danger" v-on:click="cancelCurrentNode" plain>Cancel</el-button>
        <el-button type="danger" v-if="currentNode.id !== -1" v-on:click="deleteCurrentNode">{{currentNode.askDeleteConfirmation ? Constants.view.deleteConfirmationMessageQuestion : "Delete"}}</el-button>
      </div>
    </div>
    <div class="tree-container">
      <div v-for="node in timeModelSerialized" v-bind:key="node.id">
        <div
          v-on:click="() => setCurrentNode(node)"
          class="time-model-node pointer align-center"
          v-bind:style="{
              'background-color': node.color,
                float: node.siblings.length > 0 ? 'left' : 'none',
                width: 'calc(' + node.width + '% - 10px)'
                }">
          <span>{{node.name}}</span>
        </div>
        <div
          v-for="sibling in node.siblings" v-bind:key="sibling.id"
          v-on:click="() => setCurrentNode(sibling)"
          class="time-model-node pointer align-center"
          v-bind:style="{
              'background-color': sibling.color,
                float: 'left',
                width: 'calc(' + node.siblingsWidth/node.siblings.length + '% - 10px)',
                }">
          <el-tooltip class="item" effect="dark" v-bind:content="sibling.name" placement="top">
            <span>{{sibling.name}}</span>
          </el-tooltip>
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
  name: 'TimeModel',
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
      'timeModel'
    ]),
    timeModelSerialized: function () {
      let rootNode = JSON.parse(JSON.stringify(this.timeModel))
      rootNode.siblings = []
      let timeModelSerialized = [rootNode]
      this.traverseFirstChildSerializer(timeModelSerialized, rootNode.nodes, 100)
      return timeModelSerialized
    }
  },
  methods: {
    ...mapActions([
      'editTimeModelNode',
      'saveTimeModelNode',
      'deleteTimeModelNode'
    ]),
    traverseFirstChildSerializer: function (timeModelSerialized, nodes, parentWidth) {
      if (nodes[0]) {
        let tempNode = JSON.parse(JSON.stringify(nodes[0]))
        tempNode.siblings = []
        nodes.forEach((s) => {
          if (s.id !== tempNode.id) {
            tempNode.siblings.push(s)
          }
        })
        if (tempNode.siblings.length > 0) {
          tempNode.width = parentWidth * 0.8
          tempNode.siblingsWidth = parentWidth * 0.2
        }
        else {
          tempNode.width = parentWidth
          tempNode.siblingsWidth = 0
        }
        timeModelSerialized.push(tempNode)
        this.traverseFirstChildSerializer(timeModelSerialized, tempNode.nodes, tempNode.width)
      }
    },
    setCurrentNode: function (node) {
      if (node === undefined) {
        this.currentNode = {
          id: -1,
          name: '',
          color: '#16A085',
          nodes: []
        }
      }
      else {
        this.currentNode = JSON.parse(JSON.stringify(node))
        this.currentNode.askDeleteConfirmation = false
      }
    },
    addNewNodeInLocation: function (node) {
      this.currentNode = {
        id: -1,
        name: '',
        nodes: [],
        color: '#16A085',
        location: node.id
      }
    },
    saveCurrentNode: function () {
      if (!this.validateNode()) {
        return
      }
      if (this.currentNode.id === -1) {
        let nodeToInsert = JSON.parse(JSON.stringify(this.currentNode))
        nodeToInsert.id = Math.random()
        if(nodeToInsert.location === undefined) {
          nodeToInsert.location =this.timeModelSerialized[this.timeModelSerialized.length - 1].id
        }
        this.saveTimeModelNode(nodeToInsert)
      }
      else {
        this.editTimeModelNode(JSON.parse(JSON.stringify(this.currentNode)))
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
        this.deleteTimeModelNode(JSON.parse(JSON.stringify(this.currentNode)))
        this.currentNode = undefined
      }
    },
    deleteNode: function (node) {
      if (!node.askDeleteConfirmation) {
        node.askDeleteConfirmation = true
        this.$forceUpdate();
      }
      else {
        this.deleteTimeModelNode(JSON.parse(JSON.stringify(node)))
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
.tree-container{
  width: calc(80% + 40px);
  margin: 0 auto;
  padding: 20px 0;
}
.time-model-node{
  padding: 5px 0;
  border-radius: 4px;
  margin: 5px;
  height: 50px;
  line-height: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.time-model-node:hover {
  background-color: whitesmoke
}
.time-model-node:hover .action-bar-node{
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
</style>
