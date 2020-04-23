import Mock from 'mockjs'

const top = [{
    label: "首页",
    path: "/wel/index",
    icon: 'el-icon-document',
    meta: {
        i18n: 'dashboard',
    },
    parentId: 0
}]
const first = [{
    label: "银行B2B",
    path: '/bosc',
    icon: 'icon-caidan',
    children: [{
        label: "对公开户",
        path: 'bosc/12102',
        component: 'views/bosc/bosc12102',
        icon: 'icon-caidan',
        children: [],
        query: {
            id: 12102,
            platsysid: 'BOSCB2B'
        }
    }, {
        label: "个人开户",
        path: 'bosc/12101',
        component: 'views/bosc/bosc12101',
        icon: 'icon-caidan',
        children: [],
        query: {
            id: 12101,
            platsysid: 'BOSCB2B'
        }
    }]
}, {
    label: "银行B2C",
    path: '/bosc1',
    icon: 'icon-caidan',
    children: [{
        label: "对公开户",
        path: 'bosc1/12102',
        component: 'views/bosc/bosc12102',
        icon: 'icon-caidan',
        children: [],
        query: {
            id: 12102,
            platsysid: 'BOSCB2B'
        }
    }, {
        label: "个人开户",
        path: 'bosc1/12101',
        component: 'views/bosc/bosc12101',
        icon: 'icon-caidan',
        children: [],
        query: {
            id: 12101,
            platsysid: 'BOSCB2B'
        }
    }, {
        label: "上传测试",
        path: 'bosc1/upload',
        component: 'views/bosc/upload',
        icon: 'icon-caidan',
        children: [],
        query: {
            id: 12101,
            platsysid: 'BOSCB2B'
        }
    },
        {
            label: "客户设置",
            path: 'bosc1/member',
            component: 'views/member/index',
            icon: 'icon-caidan',
			children: [],
        }]
}]
const second = []
const third = [{
    label: "测试页面",
    path: '/test',
    component: 'views/test',
    icon: 'icon-caidan',
    meta: {
        i18n: 'test',
    },
    children: []
}]
export default ({
                    mock
                }) => {
    if (!mock) return;
    let menu = [first, second, third];
    Mock.mock('/user/getMenu', 'get', (res) => {
        let body = JSON.parse(res.body);
        return {
            data: menu[body.type] || []
        }
    })
    Mock.mock('/user/getTopMenu', 'get', () => {
        return {
            data: top
        }
    })
}
