// 基础路径 注意发布之前要先修改这里
let baseUrl = './'

module.exports = {
    publicPath: baseUrl, // 根据你的实际情况更改这里
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        proxy: { //axios跨域处理
            '/boscTest': { //此处并非和url一致
                target: 'http://127.0.0.1:9090/sendTest',
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    '^/boscTest': ''
                }
            }
        }
    },
    // chainWebpack: (config) => {
    //     //忽略的打包文件
    //     config.externals({
    //         'vue': 'Vue',
    //         'vue-router': 'VueRouter',
    //         'vuex': 'Vuex',
    //         'axios': 'axios',
    //         'element-ui': 'ELEMENT',
    //     })
    //     const entry = config.entry('app')
    //     entry
    //         .add('babel-polyfill')
    //         .end()
    //     entry
    //         .add('classlist-polyfill')
    //         .end()
    //     entry
    //         .add('@/mock')
    //         .end()
    // },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.czzdit",
                "productName": "上期所管理端",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2022",//版权信息
                "directories": {
                    "output": "./dist"//输出文件路径
                },
                "win": {//win相关配置
                    "icon": "./favicon.ico",//图标，当前图标在根目录下，注意这里有两个坑256*256
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./favicon.ico",// 安装图标
                    "uninstallerIcon": "./favicon.ico",//卸载图标
                    "installerHeaderIcon": "./favicon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "上期所管理端", // 图标名称
                },
            }
        }

    }
}
