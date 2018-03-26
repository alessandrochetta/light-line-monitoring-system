import Vue from 'vue'
import Router from 'vue-router'
import PlantModel from '@/components/PlantModel'
import States from '@/components/States'
import Counters from '@/components/Counters'
import ContextFields from '@/components/ContextFields'
import TimeModel from '@/components/TimeModel'
import ReasonTree from '@/components/ReasonTree'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PlantModel',
      component: PlantModel
    },
    {
      path: '/plant-model',
      name: 'PlantModel',
      component: PlantModel
    },
    {
      path: '/states',
      name: 'States',
      component: States
    },
    {
      path: '/counters',
      name: 'Counters',
      component: Counters
    },
    {
      path: '/context-fields',
      name: 'ContextFields',
      component: ContextFields
    },
    {
      path: '/time-model',
      name: 'TimeModel',
      component: TimeModel
    },
    {
      path: '/reason-tree',
      name: 'ReasonTree',
      component: ReasonTree
    }
  ]
})
