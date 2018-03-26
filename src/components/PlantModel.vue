<template>
  <div class="plant-model">
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
      <el-button type="primary" v-if="!currentNode" v-on:click="() => setCurrentNode(undefined)" icon="el-icon-plus" plain>Add node</el-button>
    </div>
    <div class="node-manipulation rounded" v-if="currentNode" @keyup.enter="saveCurrentNode">
      <div class="input-row col5050">
        <el-input placeholder="Node name" v-model="currentNode.name">
          <template slot="prepend">Node name</template>
        </el-input>
      </div>

      <div class="input-row col5050">
        <el-select v-model="currentNode.location" placeholder="Location" class="full-width">
          <el-option
            v-for="node in plantModelSerialized"
            v-if="currentNode.id !== node.id"
            :key="node.id"
            :label="node.path"
            :value="node.id">
          </el-option>
        </el-select>
      </div>
      <div class="clear"></div>
      <div class="input-row">
        <el-input placeholder="OPC server" v-model="currentNode.opcServer">
          <template slot="prepend">OPC server address</template>
        </el-input>
      </div>

      <div class="input-row col5050">
        <el-input placeholder="State node" disabled>
          <template slot="prepend">State tag</template>
        </el-input>
      </div>
      <div class="input-row col5050">
        <el-input placeholder="State node address" v-model="currentNode.state">
          <template slot="prepend">Tag address</template>
        </el-input>
      </div>
      <div class="clear"></div>

      <div v-for="(c, index) in currentNode.counters" v-bind:key="c.id">
        <div class="input-row col5050">
          <el-button type="danger" class="tag-delete-button" v-on:click="() => deleteCounter(index)" icon="el-icon-delete" plain></el-button>
          <el-select v-model="c.counterId" placeholder="Counter tag" class="tag-dropdown-width">
            <el-option
              v-for="counter in availableCounters"
              v-if="!counter.linked || counter.id === c.counterId"
              :key="counter.id"
              :label="counter.name"
              :value="counter.id">
            </el-option>
          </el-select>
        </div>
        <div class="input-row col5050">
          <el-input placeholder="Tag address" v-model="c.tagAddress">
            <template slot="prepend">Tag address</template>
          </el-input>
        </div>
        <div class="clear"></div>
      </div>

      <div class="action-bar-middle">
        <el-button type="primary" v-on:click="addCounter" plain class="full-width">Add counter</el-button>
      </div>

      <div v-for="(c, index) in currentNode.contextFields" v-bind:key="c.id">
        <div class="input-row col5050">
          <el-button type="danger" class="tag-delete-button" v-on:click="() => deleteContextField(index)" icon="el-icon-delete" plain></el-button>
          <el-select v-model="c.contextFieldId" placeholder="Context field tag" class="tag-dropdown-width">
            <el-option
              v-for="cf in availableContextFields"
              v-if="!cf.linked || cf.id === c.contextFieldId"
              :key="cf.id"
              :label="cf.name"
              :value="cf.id">
            </el-option>
          </el-select>
        </div>
        <div class="input-row col5050">
          <el-input placeholder="Tag address" v-model="c.tagAddress">
            <template slot="prepend">Tag address</template>
          </el-input>
        </div>
        <div class="clear"></div>
      </div>

      <div class="action-bar-middle">
        <el-button type="primary" v-on:click="addContextField" plain class="full-width">Add context field</el-button>
      </div>

      <div class="action-bar">
        <el-button type="primary" v-on:click="saveCurrentNode">{{currentNode.id === -1 ? "Save" : "Save changes"}}</el-button>
        <el-button type="danger" v-on:click="cancelCurrentNode" plain>Cancel</el-button>
        <el-button type="danger" v-if="currentNode.id !== -1" v-on:click="deleteCurrentNode">{{currentNode.askDeleteConfirmation ? Constants.view.deleteConfirmationMessageQuestion : "Delete"}}</el-button>
      </div>
    </div>
    <div class="tree-container">
      <div v-for="node in plantModelSerialized" v-bind:key="node.id" class="tree-row pointer" v-bind:class="{visible:node.visible, nonVisible:!node.visible}" v-on:click="() => expand(node)">
        <div class="col5050">
          <span v-for="i in node.dept" class="tree-indent-space" v-bind:key="node.id + i"></span>
          <i v-if="!node.expanded && node.nodes.length > 0" class="el-icon-arrow-right"></i>
          <i v-if="node.expanded && node.nodes.length > 0" class="el-icon-arrow-down"></i>
          <span v-if="node.nodes.length === 0" class="el-icon-caret-right"></span>
          <span>{{node.name}}</span>
        </div>
        <div class="col5050 action-bar-node">
          <span class="cursor" ><el-button class="row-button" plain icon="el-icon-edit" type="primary" v-on:click.stop="() => setCurrentNode(node)">Edit</el-button></span>
          <span class="cursor" ><el-button class="row-button" plain icon="el-icon-plus" type="primary" v-on:click.stop="() => addNewNodeInLocation(node)">Add node here</el-button></span>
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
  name: 'PlantModel',
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
      'plantModel',
      'counters',
      'contextFields'
    ]),
    plantModelSerialized: function () {
      let rootNode = JSON.parse(JSON.stringify(this.plantModel))
      rootNode.path = rootNode.name
      rootNode.visible = true
      let plantModelSerialized = [rootNode]
      this.deepFirstSerializer(plantModelSerialized, this.plantModel.nodes, 0, 1, rootNode.name)
      return plantModelSerialized
    },
    availableCounters: function () {
      let availableCounters = JSON.parse(JSON.stringify(this.counters))
      this.currentNode.counters.forEach((counter) => {
        availableCounters.forEach((c) => {
          if (counter.counterId === c.id)
          {
              c.linked = true
          }
        })
      })
      return availableCounters
    },
    availableContextFields: function () {
      let availableContextFields = JSON.parse(JSON.stringify(this.contextFields))
      this.currentNode.contextFields.forEach((cf) => {
        availableContextFields.forEach((c) => {
          if (cf.contextFieldId === c.id)
          {
              c.linked = true
          }
        })
      })
      return availableContextFields
    }
  },
  methods: {
    ...mapActions([
      'savePlantModelNode',
      'editPlantModelNode',
      'deletePlantModelNode',
      'expandPlantModelNode',
    ]),
    addCounter: function () {
      this.currentNode.counters.push({
        counterId: undefined,
        tagAddress: ''
      })
    },
    deleteCounter: function (i) {
      this.currentNode.counters.splice(i, 1)
    },
    addContextField: function () {
      this.currentNode.contextFields.push({
        contextFieldId: undefined,
        tagAddress: ''
      })
    },
    deleteContextField: function (i) {
      this.currentNode.contextFields.splice(i, 1)
    },
    deepFirstSerializer: function (plantModelSerialized, nodes, index, dept, path) {
      if (nodes[index]) {
        let tempNode = JSON.parse(JSON.stringify(nodes[index]))
        tempNode.path = path + ' - ' + tempNode.name
        tempNode.dept = dept
        plantModelSerialized.push(tempNode)
        this.deepFirstSerializer(plantModelSerialized, nodes[index].nodes, 0, dept + 1, tempNode.path)
        this.deepFirstSerializer(plantModelSerialized, nodes, index + 1, dept, path)
      }
    },
    setCurrentNode: function (node) {
      if (node === undefined) {
        this.currentNode = {
          id: -1,
          name: '',
          nodes: [],
          opcServer: '',
          state: '',
          counters: [],
          contextFields: []
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
        location: node.id,
        opcServer: '',
        state: '',
        counters: [],
        contextFields: []
      }
    },
    saveCurrentNode: function () {
      if (!this.validateNode()) {
        return
      }
      if (this.currentNode.id === -1) {
        let nodeToInsert = JSON.parse(JSON.stringify(this.currentNode))
        nodeToInsert.id = Math.random()
        this.savePlantModelNode(nodeToInsert)
      }
      else {
        this.editPlantModelNode(JSON.parse(JSON.stringify(this.currentNode)))
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
        this.deletePlantModelNode(JSON.parse(JSON.stringify(this.currentNode)))
        this.currentNode = undefined
      }
    },
    deleteNode: function (node) {
      if (!node.askDeleteConfirmation) {
        node.askDeleteConfirmation = true
        this.$forceUpdate();
      }
      else {
        this.deletePlantModelNode(JSON.parse(JSON.stringify(node)))
      }
    },
    cancelNodeDeltion: function (node) {
      node.askDeleteConfirmation = false
      this.$forceUpdate();
    },
    expand: function (node) {
      this.expandPlantModelNode(JSON.parse(JSON.stringify(node)))
    },
    validateNode: function() {
      let localMessage = 'Fields '
      let error = false
      if (this.currentNode.name.length === 0) {
        localMessage += 'Name '
        error = true
      }
      if (this.currentNode.opcServer.length === 0) {
        localMessage += 'OPC server address '
        error = true
      }
      if (this.currentNode.state.length === 0) {
        localMessage += 'Tag address '
        error = true
      }
      let countersToDelete = []
      this.currentNode.counters.forEach((c, i) => {
        if (c.counterId === undefined) {
          countersToDelete.push(i)
        }
        else {
          if (c.tagAddress.length === 0) {
            localMessage += 'Tag address '
            error = true
          }
        }
      })
      countersToDelete.sort((a, b) => a < b).forEach((i) => {
        this.currentNode.counters.splice(i, 1)
      })

      let contextFieldsToDelete = []
      this.currentNode.contextFields.forEach((c, i) => {
        if(c.contextFieldId === undefined) {
          contextFieldsToDelete.push(i)
        }
        else {
          if (c.tagAddress.length === 0) {
            localMessage += 'Tag address '
            error = true
          }
        }
      })
      contextFieldsToDelete.sort((a, b) => a < b).forEach((i) => {
        this.currentNode.contextFields.splice(i, 1)
      })

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
.action-bar-middle{
  text-align: center;
  padding: 10px;
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
  padding: 4px 10px;
  box-sizing: border-box;
}
.tag-dropdown-width{
  width: calc(100% - 60px)
}
.tag-delete-button{
  width: 55px
}
</style>
