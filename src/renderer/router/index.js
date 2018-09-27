import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/components/LandingPage'
import AnalysisIndex from '@/components/analysis/AnalysisIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/analysis',
      name: 'analysis-index',
      component: AnalysisIndex
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
