import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/knowledge-classify',
                    component: resolve => require(['../components/page/KnowledgeClassify.vue'], resolve),
                },
                {
                    path: '/knowledge-article',
                    component: resolve => require(['../components/page/KnowledgeArticle.vue'], resolve),
                },
                {
                    path: '/rules-classify',
                    component: resolve => require(['../components/page/RulesClassify.vue'], resolve),
                },
                {
                    path: '/rules-article',
                    component: resolve => require(['../components/page/RulesArticle.vue'], resolve),
                },
                {
                    path: '/manager',
                    component: resolve => require(['../components/page/Manager.vue'], resolve),
                },
                {
                    path: '/service-type',
                    component: resolve => require(['../components/page/ServiceType.vue'], resolve),
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/Feedback.vue'], resolve),
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/Log.vue'], resolve),
                },
                {
                    path: '/dispatch',
                    component: resolve => require(['../components/page/Dispatch.vue'], resolve),
                },
                {
                    path: '/project',
                    component: resolve => require(['../components/page/Project.vue'], resolve),
                },
                {
                    path: '/approvers',
                    component: resolve => require(['../components/page/Approvers.vue'], resolve),
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
