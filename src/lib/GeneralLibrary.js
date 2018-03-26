import Vue from 'vue'

export var GeneralLibrary = {
  findNode: function (parent, currentNode, nodeToFind) {
    let returnValue = {parent, currentNode, found: false}
    if (currentNode.id === nodeToFind.id) {
      returnValue.found = true
      return returnValue
    }
    else{
      let results = []
      currentNode.nodes.forEach((n) => {
        results.push(this.findNode(currentNode, n, nodeToFind))
      })
      results.forEach((r) => {
        if (r.found) {
          returnValue = r
        }
      })
      return returnValue
    }
  },
  traverseAssignCollapse: function (node) {
    if (node) {
      Vue.set(node, 'visible', false)
      Vue.set(node, 'expanded', false)
      node.nodes.forEach((n) => {
        this.traverseAssignCollapse(n)
      })
    }
  },
  traverseAssignExpand: function (node) {
    if (node) {
      Vue.set(node, 'expanded', true)
      Vue.set(node, 'visible', true)
      node.nodes.forEach((n) => {
        this.traverseAssignExpand(n)
      })
    }
  },
  findElementInListById: function (list, elementToFind) {
    let foundElement
    list.forEach((e) => {
      if(e.id === elementToFind.id) {
        foundElement = e
      }
    })
    return foundElement
  },
  mergeStatesAndTimeModel: function(timeModel, states, r) {
    if (r.timeModelNodeId !== undefined) {
      let timeModelNode = this.findNode(timeModel, timeModel, {id: r.timeModelNodeId})
      r.name = timeModelNode.currentNode.name
      r.color = timeModelNode.currentNode.color
    }

    if (r.stateId !== undefined) {
      states.forEach((s) => {
        if (r.stateId === s.id) {
          r.name = s.name
          r.color = s.color
        }
      })
    }

    r.nodes.forEach((n) => {
      this.mergeStatesAndTimeModel(timeModel, states, n)
    })
  }
}
