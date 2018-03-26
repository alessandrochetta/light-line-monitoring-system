<template>
  <div class="reason-tree">
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
      <el-button type="primary" v-if="!currentNode" v-on:click="() => setCurrentNode(undefined)" icon="el-icon-plus" plain>Add state to reason tree</el-button>
    </div>
    <div class="node-manipulation rounded" v-if="currentNode" @keyup.enter="saveCurrentNode">
      <div class="input-row col5050">
        <el-select v-model="currentNode.stateId" placeholder="State" class="full-width">
          <el-option
            v-for="node in notLinkedStates"
            v-if="!node.linked"
            :key="node.id"
            :label="node.name"
            :value="node.id">
          </el-option>
        </el-select>
      </div>
      <div class="input-row col5050">
        <el-select v-model="currentNode.location" placeholder="Location" class="full-width">
          <el-option
            v-for="(node, index) in reasonTreeSerialized"
            v-if="currentNode.id !== node.id && index !== 0"
            :key="node.id"
            :label="node.path"
            :value="node.id">
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
    <div class="tree-container">
      <div v-for="(node, index) in reasonTreeSerialized" v-bind:key="node.id" class="tree-row pointer" v-bind:class="{visible:node.visible, nonVisible:!node.visible}" v-on:click="() => expand(node)">
        <div class="col5050">
          <span v-for="i in node.dept" class="tree-indent-space" v-bind:key="node.id + i"></span>
          <i v-if="!node.expanded && node.nodes.length > 0" class="el-icon-arrow-right"></i>
          <i v-if="node.expanded && node.nodes.length > 0" class="el-icon-arrow-down"></i>
          <span v-if="node.nodes.length === 0" class="el-icon-caret-right"></span>
          <span v-if="index > 0" class="color-display" v-bind:style="{ 'background-color': node.color }">&nbsp;</span> <span>{{node.name}}</span>
        </div>
        <div class="col5050 action-bar-node" v-if="index > 0">
          <span class="cursor" v-if="node.stateId !== undefined" ><el-button class="row-button" plain icon="el-icon-edit" type="primary" v-on:click.stop="() => setCurrentNode(node)">Edit</el-button></span>
          <span class="cursor" ><el-button class="row-button" plain icon="el-icon-plus" type="primary" v-on:click.stop="() => addNewNodeInLocation(node)">Add node here</el-button></span>
          <span class="cursor" v-if="node.stateId !== undefined"><el-button class="row-button" plain icon="el-icon-close" type="danger" v-on:click.stop="() => deleteNode(node)">{{node.askDeleteConfirmation ? Constants.view.deleteConfirmationMessageQuestion : "Delete"}}</el-button></span>
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
  name: 'ReasonTree',
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
      'reasonTree',
      'states'
    ]),
    reasonTreeSerialized: function () {
      let rootNode = JSON.parse(JSON.stringify(this.reasonTree))
      rootNode.path = rootNode.name
      rootNode.visible = true
      rootNode.expanded = true
      let reasonTreeSerialized = [rootNode]
      this.deepFirstSerializer(reasonTreeSerialized, this.reasonTree.nodes, 0, 1, rootNode.name)
      return reasonTreeSerialized
    },
    notLinkedStates: function () {
      this.states.forEach((s) => { s.linked = false })
      this.states.forEach((s) => {
        this.reasonTreeSerialized.forEach((r) => {
          if (r.stateId === s.id) {
            s.linked = true
          }
        })
        if (s.id === this.currentNode.stateId) {
          s.linked = false
        }
      })
      return this.states
    }
  },
  methods: {
    ...mapActions([
      'saveReasonTreeNode',
      'editReasonTreeNode',
      'deleteReasonTreeNode',
      'expandReasonTreeNode'
    ]),
    deepFirstSerializer: function (reasonTreeSerialized, nodes, index, dept, path) {
      if (nodes[index]) {
        let tempNode = JSON.parse(JSON.stringify(nodes[index]))
        tempNode.path = path + ' - ' + tempNode.name
        tempNode.dept = dept
        if (tempNode.timeModelNodeId) {
          tempNode.visible = true
        }
        reasonTreeSerialized.push(tempNode)
        this.deepFirstSerializer(reasonTreeSerialized, nodes[index].nodes, 0, dept + 1, tempNode.path)
        this.deepFirstSerializer(reasonTreeSerialized, nodes, index + 1, dept, path)
      }
    },
    setCurrentNode: function (node) {
      if (node === undefined) {
        this.currentNode = {
          id: -1,
          stateId: undefined,
          location: undefined,
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
        stateId: undefined,
        nodes: [],
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
        this.saveReasonTreeNode(nodeToInsert)
        this.currentNode.stateId = undefined
      }
      else {
        this.editReasonTreeNode(JSON.parse(JSON.stringify(this.currentNode)))
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
        this.deleteReasonTreeNode(JSON.parse(JSON.stringify(this.currentNode)))
        this.currentNode = undefined
      }
    },
    deleteNode: function (node) {
      if (!node.askDeleteConfirmation) {
        node.askDeleteConfirmation = true
        this.$forceUpdate();
      }
      else {
        this.deleteReasonTreeNode(JSON.parse(JSON.stringify(node)))
      }
    },
    cancelNodeDeltion: function (node) {
      node.askDeleteConfirmation = false
      this.$forceUpdate();
    },
    expand: function (node) {
      this.expandReasonTreeNode(JSON.parse(JSON.stringify(node)))
    },
    validateNode: function() {
      let localMessage = 'Fields '
      let error = false
      if (this.currentNode.stateId === undefined) {
        localMessage += 'State '
        error = true
      }
      if (this.currentNode.location === undefined) {
        localMessage += 'Location '
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
.tree-indent-space{
  width: 20px;
  display: inline-block;
}
.tree-row{
   padding: 5px 0;
   border-radius: 4px;
}
.tree-row:hover {
  background-color: whitesmoke
}
.tree-row:hover .action-bar-node{
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
