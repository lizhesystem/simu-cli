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
	chainWebpack: (config) => {
		//忽略的打包文件
		config.externals({
			'vue': 'Vue',
			'vue-router': 'VueRouter',
			'vuex': 'Vuex',
			'axios': 'axios',
			'element-ui': 'ELEMENT',
		})
		const entry = config.entry('app')
		entry
			.add('babel-polyfill')
			.end()
		entry
			.add('classlist-polyfill')
			.end()
		entry
			.add('@/mock')
			.end()
	}
}
