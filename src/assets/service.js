export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },
    //baseURL: "http://yly4.ylyedu.com/",
    // baseURL: "",
    baseURL: "http://localhost:8009",


    // 管理员相关
    login: "/admin/user/login",
    logout: "/admin/user/logout",
    addAdmin: "/admin/user/create",
    getAdmin: "/admin/user/get",
    deleteAdmin: "/admin/user/delete",
    updateAdmin: "/admin/user/update",

    // 审批人员管理
    addApprove: '/admin/Approve/create',
    getApprove: '/admin/Approve/get',
    updateApprove: '/admin/Approve/update',

    // 出差记录
    getInvoice: '/admin/invoice/get',
    getInvoiceDetail: '/admin/invoice/getInfo',

    // 报销管理
    getDispatch: '/admin/dispatch/get',
    addDispatch: '/admin/dispatch/create',
    getDispatchDetail: '/admin/dispatch/getInfo',
    getDispatchAudit: '/admin/dispatch/audit',

    // 知识库分类
    addKnowledgeClassify: '/admin/Knowledge_Classify/create',
    delKnowledgeClassify: '/admin/Knowledge_Classify/delete',
    updateKnowledgeClassify: '/admin/Knowledge_Classify/update',
    getKnowledgeClassify: '/admin/Knowledge_Classify/get',

    // 知识库文章
    addKnowledge: '/admin/Knowledge/create',
    delKnowledge: '/admin/Knowledge/delete',
    updateKnowledge: '/admin/Knowledge/update',
    getKnowledge: '/admin/Knowledge/get',

    // 管理制度分类
    addRulesClassify: '/admin/Rules_Classify/create',
    delRulesClassify: '/admin/Rules_Classify/delete',
    updateRulesClassify: '/admin/Rules_Classify/update',
    getRulesClassify: '/admin/Rules_Classify/get',

    // 管理制度文章
    addRules: '/admin/Rules/create',
    delRules: '/admin/Rules/delete',
    updateRules: '/admin/Rules/update',
    getRules: '/admin/Rules/get',

    // 反馈管理
    getFeedback: '/admin/Feedback/get',
    delFeedback: '/admin/Feedback/delete',

    // 配置-服务类型
    addServiceType: '/admin/Service_Type/create',
    delServiceType: '/admin/Service_Type/delete',
    updateServiceType: '/admin/Service_Type/update',
    getServiceType: '/admin/Service_Type/get',

    // 日志管理
    getLog: '/admin/log/get',
    delLog: '/admin/log/delete',

    // qiniu
    qiniu: "/api/tools/getToken",
}