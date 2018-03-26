import Vue from 'vue'
import Vuex from 'vuex'
import {GeneralLibrary} from '../lib/GeneralLibrary'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    plantModel: {
      name: 'Rims factory plant',
      id: 1,
      opcServer: '',
      state: '',
      counters: [],
      contextFields: [],
      expanded: true, // view only
      visible: true, // view only
      nodes: [
        {
          name: 'Receiving Area',
          id: 2,
          opcServer: '',
          state: '',
          counters: [],
          contextFields: [],
          visible: true, // view only
          nodes: [
            {
              name: 'Line 1',
              id: 23,
              nodes: [{
                name: 'Conveyor 1',
                id: 3,
                nodes: [],
                opcServer: '',
                state: '',
                counters: [],
                contextFields: []
              },
              {
                name: 'Conveyor 2',
                id: 27,
                nodes: [],
                opcServer: '',
                state: '',
                counters: [],
                contextFields: []
              }],
              opcServer: '',
              state: '',
              counters: [],
              contextFields: []
            },
            {
              name: 'Line 2',
              id: 24,
              nodes: [{
                name: 'Conveyor 1',
                id: 25,
                nodes: [],
                opcServer: '',
                state: '',
                counters: [],
                contextFields: []
              },
              {
                name: 'Conveyor 2',
                id: 26,
                nodes: [],
                opcServer: '',
                state: '',
                counters: [],
                contextFields: []
              }],
              opcServer: '',
              state: '',
              counters: [],
              contextFields: []
            }
          ]
        },
        {
          name: 'Smelting and Holding Area',
          id: 4,
          opcServer: '',
          state: '',
          counters: [],
          contextFields: [],
          visible: true, // view only
          nodes: [
            {
              name: 'Line 1',
              id: 5,
              opcServer: '',
              state: '',
              counters: [],
              contextFields: [],
              nodes: [{
                name: 'Smelting tower',
                id: 7,
                opcServer: '',
                state: '',
                counters: [],
                contextFields: [],
                nodes: []
              },
              {
                name: 'Vortex furnace',
                id: 8,
                opcServer: '',
                state: '',
                counters: [],
                contextFields: [],
                nodes: []
              },
              {
                name: 'Reverberatory holding furnace',
                id: 9,
                opcServer: '',
                state: '',
                counters: [],
                contextFields: [],
                nodes: []
              },
              {
                name: 'Low-pressure casting machine',
                id: 10,
                opcServer: '',
                state: '',
                counters: [],
                contextFields: [],
                nodes: []
              },
              {
                name: 'Continuous roller',
                id: 11,
                opcServer: '',
                state: '',
                counters: [],
                contextFields: [],
                nodes: []
              }]
            }
          ]
        }
      ]
    },
    states: [
      {
        id: 4,
        name: 'Electrical ',
        color: '#2c3e50'
      },
      {
        id: 3,
        name: 'Broken belt',
        color: '#8e44ad'
      },
      {
        id: 2,
        name: 'Generic electrical stop',
        color: '#d35400'
      },
      {
        id: 0,
        name: 'Unplanned maintenance',
        color: '#c0392b'
      },
      {
        id: 1,
        name: 'Running',
        color: '#27ae60'
      }
    ],
    counters: [
      {
        id: 0,
        name: 'Good',
        threshold: '1000000',
        uom: 'Unit',
        magnitude: '1'
      },
      {
        id: 1,
        name: 'Bad',
        threshold: '1000000',
        uom: 'Unit',
        magnitude: '1'
      }
    ],
    contextFields: [
      {
        id: 0,
        name: 'Shift',
        uom: '',
        magnitude: undefined,
        defaultValue: undefined
      },
      {
        id: 1,
        name: 'TargetSpeed',
        uom: 'Unit',
        magnitude: 10,
        defaultValue: undefined
      },
      {
        id: 2,
        name: 'Temperature',
        uom: 'Celsius',
        magnitude: 1,
        defaultValue: undefined
      },
      {
        id: 3,
        name: 'Pressure',
        uom: 'Bar',
        magnitude: 1,
        defaultValue: undefined
      },
      {
        id: 4,
        name: 'Material',
        uom: '',
        magnitude: undefined,
        defaultValue: undefined
      }
    ],
    timeModel: {
      id: 0,
      name: 'Total time available',
      color: '#f5f5f5',
      nodes: [
        {
          id: 1,
          name: 'Scheduled time',
          color: '#eff6fd',
          nodes: [{
            id: 4,
            name: 'Operating time',
            color: '#ffe3b1',
            nodes: [{
              id: 7,
              name: 'Net operating time',
              color: '#f8c5cd',
              nodes: [
                {
                  id: 11,
                  name: 'Run time',
                  color: '#d0f9f1',
                  nodes: []
                },
                {
                  id: 10,
                  name: 'Quality loss',
                  color: '#aef4e6',
                  nodes: []
                }]
            },
            {
              id: 8,
              name: 'Performance loss',
              color: '#f5aeb9',
              nodes: []
            }]
          },
          {
            id: 5,
            name: 'Change over',
            color: '#ffd589',
            nodes: []
          },
          {
            id: 6,
            name: 'Unplanned downtime',
            color: '#ffc04e',
            nodes: []
          }]
        },
        {
          id: 2,
          name: 'Planned downtime',
          color: '#d8e9fa',
          nodes: []
        },
        {
          id: 3,
          name: 'Input output downtime',
          color: '#bed0e9',
          nodes: []
        }
      ]
    },
    reasonTree: {
      id: 0,
      name: 'Reason tree',
      nodes: [
        {
          id: 1,
          timeModelNodeId: 2,
          nodes: [{
            id: 22,
            stateId: 1,
            nodes: []
          }]
        },
        {
          id: 2,
          timeModelNodeId: 3,
          nodes: []
        },
        {
          id: 3,
          timeModelNodeId: 5,
          nodes: []
        },
        {
          id: 4,
          timeModelNodeId: 6,
          nodes: []
        },
        {
          id: 5,
          timeModelNodeId: 8,
          nodes: []
        },
        {
          id: 6,
          timeModelNodeId: 10,
          nodes: []
        }
      ]
    },
    magnitudes: [0.000001, 0.00001, 0.0001, 0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000, 1000000]
  },
  getters: {
    plantModel: (state) => {
      return state.plantModel
    },
    states: (state) => {
      let states = JSON.parse(JSON.stringify(state.states)).sort((e1, e2) => e1.name.toLowerCase() > e2.name.toLowerCase())
      return states
    },
    counters: (state) => {
      let counters = JSON.parse(JSON.stringify(state.counters)).sort((e1, e2) => e1.name.toLowerCase() > e2.name.toLowerCase())
      return counters
    },
    contextFields: (state) => {
      let contextFields = JSON.parse(JSON.stringify(state.contextFields)).sort((e1, e2) => e1.name.toLowerCase() > e2.name.toLowerCase())
      return contextFields
    },
    timeModel: (state) => {
      return state.timeModel
    },
    reasonTree: (state) => {
      GeneralLibrary.mergeStatesAndTimeModel(state.timeModel, state.states, state.reasonTree)
      return state.reasonTree
    },
    magnitudes: (state) => {
      return state.magnitudes
    }
  },
  mutations: {
    savePlantModelNode: (state, payload) => {
      if (payload.node.location === undefined || payload.nextParentNodeLocation === undefined)
      {
        state.plantModel.nodes.push(payload.node)
      }
      else
      {
        payload.nextParentNodeLocation.currentNode.nodes.push(payload.node)
      }
      GeneralLibrary.traverseAssignExpand(state.plantModel)
    },
    deletePlantModelNode: (state, payload) => {
      let position = 0
      payload.parent.nodes.forEach((n) => {
        if (n.id === payload.currentNode.id) {
          payload.parent.nodes.splice(position, 1)
        }
        position += 1
      })
    },
    editPlantModelNode: (state, payload) => {
      payload.nodeLocation.currentNode.name = payload.updatedNode.name
      payload.nodeLocation.currentNode.opcServer = payload.updatedNode.opcServer
      payload.nodeLocation.currentNode.state = payload.updatedNode.state
      payload.nodeLocation.currentNode.counters = payload.updatedNode.counters
      payload.nodeLocation.currentNode.contextFields = payload.updatedNode.contextFields
    },
    expandPlantModelNode: (state, payload) => {
      if (payload.currentNode.nodes.length === 0) {
        return
      }
      if (payload.currentNode.nodes[0].visible === undefined || payload.currentNode.nodes[0].visible === false) {
        Vue.set(payload.currentNode, 'expanded', true)
        payload.currentNode.nodes.forEach((n) => {
          Vue.set(n, 'visible', true)
        })
      }
      else {
        Vue.set(payload.currentNode, 'expanded', false)
        payload.currentNode.nodes.forEach((n) => {
          GeneralLibrary.traverseAssignCollapse(n)
        })
      }
    },
    saveState: (state, payload) => {
      state.states.push(payload)
    },
    editState: (state, payload) => {
      let elementToEdit = GeneralLibrary.findElementInListById(state.states, payload)
      if (elementToEdit) {
        elementToEdit.name = payload.name
        elementToEdit.color = payload.color
      }
    },
    deleteState: (state, payload) => {
      state.states.forEach((c, i) => {
        if (c.id === payload.id) {
          state.states.splice(i, 1)
        }
      })
    },
    saveCounter: (state, payload) => {
      state.counters.push(payload)
    },
    editCounter: (state, payload) => {
      let elementToEdit = GeneralLibrary.findElementInListById(state.counters, payload)
      if (elementToEdit) {
        elementToEdit.name = payload.name
        elementToEdit.threshold = payload.threshold
        elementToEdit.uom = payload.uom
        elementToEdit.magnitude = payload.magnitude
      }
    },
    deleteCounter: (state, payload) => {
      state.counters.forEach((c, i) => {
        if (c.id === payload.id) {
          state.counters.splice(i, 1)
        }
      })
    },
    saveContextField: (state, payload) => {
      state.contextFields.push(payload)
    },
    editContextField: (state, payload) => {
      let elementToEdit = GeneralLibrary.findElementInListById(state.contextFields, payload)
      if (elementToEdit) {
        elementToEdit.name = payload.name
        elementToEdit.defaultValue = payload.defaultValue
        elementToEdit.uom = payload.uom
        elementToEdit.magnitude = payload.magnitude
      }
    },
    deleteContextField: (state, payload) => {
      state.contextFields.forEach((c, i) => {
        if (c.id === payload.id) {
          state.contextFields.splice(i, 1)
        }
      })
    },
    saveTimeModelNode: (state, payload) => {
      if (payload.node.location === undefined || payload.nextParentNodeLocation === undefined) {
        state.timeModel.nodes.push(payload.node)
      }
      else {
        payload.nextParentNodeLocation.currentNode.nodes.push(payload.node)
      }
    },
    editTimeModelNode: (state, payload) => {
      payload.nodeLocation.currentNode.name = payload.updatedNode.name
      payload.nodeLocation.currentNode.color = payload.updatedNode.color
      payload.nodeLocation.currentNode.location = payload.updatedNode.location
    },
    deleteTimeModelNode: (state, payload) => {
      let position = 0
      payload.parent.nodes.forEach((n) => {
        if (n.id === payload.currentNode.id) {
          payload.parent.nodes.splice(position, 1)
        }
        position += 1
      })
    },
    expandReasonTreeNode: (state, payload) => {
      if (payload.currentNode.nodes.length === 0) {
        return
      }
      if (payload.currentNode.nodes[0].visible === undefined || payload.currentNode.nodes[0].visible === false) {
        Vue.set(payload.currentNode, 'expanded', true)
        payload.currentNode.nodes.forEach((n) => {
          Vue.set(n, 'visible', true)
        })
      }
      else {
        Vue.set(payload.currentNode, 'expanded', false)
        payload.currentNode.nodes.forEach((n) => {
          GeneralLibrary.traverseAssignCollapse(n)
        })
      }
    },
    saveReasonTreeNode: (state, payload) => {
      if (payload.node.location === undefined || payload.nextParentNodeLocation === undefined) {
        state.reasonTree.nodes.push(payload.node)
      }
      else {
        payload.nextParentNodeLocation.currentNode.nodes.push(payload.node)
      }
      GeneralLibrary.traverseAssignExpand(state.reasonTree)
    },
    deleteReasonTreeNode: (state, payload) => {
      let position = 0
      payload.parent.nodes.forEach((n) => {
        if (n.id === payload.currentNode.id) {
          payload.parent.nodes.splice(position, 1)
        }
        position += 1
      })
    },
    editReasonTreeNode: (state, payload) => {
      payload.nodeLocation.currentNode.stateId = payload.updatedNode.stateId
    }
  },
  actions: {
    savePlantModelNode: ({ commit, state }, payload) => {
      let nextParentNodeLocation
      if (payload.location !== undefined) {
        nextParentNodeLocation = GeneralLibrary.findNode(state.plantModel, state.plantModel, {id: payload.location})
      }
      payload = {nextParentNodeLocation, node: payload}
      commit('savePlantModelNode', payload)
    },
    deletePlantModelNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.plantModel, state.plantModel, payload)
      commit('deletePlantModelNode', nodeLocation)
    },
    editPlantModelNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.plantModel, state.plantModel, payload)
      if (payload.location !== undefined) {
        let nextParentNodeLocation = GeneralLibrary.findNode(state.plantModel, state.plantModel, {id: payload.location})
        commit('deletePlantModelNode', nodeLocation)
        payload = {nextParentNodeLocation, node: payload}
        commit('savePlantModelNode', payload)
      }
      else
      {
        payload = {nodeLocation, updatedNode: payload}
        commit('editPlantModelNode', payload)
      }
    },
    expandPlantModelNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.plantModel, state.plantModel, payload)
      commit('expandPlantModelNode', nodeLocation)
    },
    editState: ({ commit, state }, payload) => {
      commit('editState', payload)
    },
    saveState: ({ commit, state }, payload) => {
      commit('saveState', payload)
    },
    deleteState: ({ commit, state }, payload) => {
      commit('deleteState', payload)
    },
    editCounter: ({ commit, state }, payload) => {
      commit('editCounter', payload)
    },
    saveCounter: ({ commit, state }, payload) => {
      commit('saveCounter', payload)
    },
    deleteCounter: ({ commit, state }, payload) => {
      commit('deleteCounter', payload)
    },
    editContextField: ({ commit, state }, payload) => {
      commit('editContextField', payload)
    },
    saveContextField: ({ commit, state }, payload) => {
      commit('saveContextField', payload)
    },
    deleteContextField: ({ commit, state }, payload) => {
      commit('deleteContextField', payload)
    },
    saveTimeModelNode: ({ commit, state }, payload) => {
      let nextParentNodeLocation
      if (payload.location !== undefined) {
        nextParentNodeLocation = GeneralLibrary.findNode(state.timeModel, state.timeModel, {id: payload.location})
      }
      payload = {nextParentNodeLocation, node: payload}
      commit('savePlantModelNode', payload)
    },
    editTimeModelNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.timeModel, state.timeModel, payload)
      if (payload.location !== undefined) {
        let nextParentNodeLocation = GeneralLibrary.findNode(state.timeModel, state.timeModel, {id: payload.location})
        commit('deleteTimeModelNode', nodeLocation)
        payload = {nextParentNodeLocation, node: payload}
        commit('saveTimeModelNode', payload)
      }
      else
      {
        payload = {nodeLocation, updatedNode: payload}
        commit('editTimeModelNode', payload)
      }
    },
    deleteTimeModelNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.timeModel, state.timeModel, payload)
      commit('deleteTimeModelNode', nodeLocation)
    },
    expandReasonTreeNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.reasonTree, state.reasonTree, payload)

      commit('expandReasonTreeNode', nodeLocation)
    },
    saveReasonTreeNode: ({ commit, state }, payload) => {
      let nextParentNodeLocation
      if (payload.location !== undefined) {
        nextParentNodeLocation = GeneralLibrary.findNode(state.reasonTree, state.reasonTree, {id: payload.location})
      }
      payload = {nextParentNodeLocation, node: payload}
      commit('saveReasonTreeNode', payload)
    },
    deleteReasonTreeNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.reasonTree, state.reasonTree, payload)
      commit('deleteReasonTreeNode', nodeLocation)
    },
    editReasonTreeNode: ({ commit, state }, payload) => {
      let nodeLocation = GeneralLibrary.findNode(state.reasonTree, state.reasonTree, payload)
      if (payload.location !== undefined) {
        let nextParentNodeLocation = GeneralLibrary.findNode(state.reasonTree, state.reasonTree, {id: payload.location})
        commit('deleteReasonTreeNode', nodeLocation)
        payload = {nextParentNodeLocation, node: payload}
        commit('saveReasonTreeNode', payload)
      }
      else
      {
        payload = {nodeLocation, updatedNode: payload}
        commit('editReasonTreeNode', payload)
      }
    }
  }
})
