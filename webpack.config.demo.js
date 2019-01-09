const path = require('path');
module.exports = {
    entry: './app/entry',
    entry: ['./app/entry1', './app/entry2'],
    entry: {
        a: './app/entry-a',
        b: ['./app/entry-b1', './app/entry-b2']
    }, //生成多个chunk??
    output: {
        //必须是string类型的绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        filename: "[name].js",//配置了多个entry??
        filename: '[chunkhash].js',//文件内容的hash值

        //发布到线上的所有资源的URL前缀
        publicPath: "https://cdn.example.com",//放到cdn

        crossOriginLoading: "use-credentials",
        crossOriginLoading: "anonymous",
        crossOriginLoading: false,
    },

    //配置模块相关
    module:{
        rules: [
            {
                test:/\.jsx?$/,   //1.优化
                include:[ //只命中这里面的文件 2.优化
                    path.resolve(__dirname,'app')
                ],
                exclude:[ //忽略这里面的文件
                    path.resolve(__dirname,'app/demo-files')
                ],
                use:[ //使用哪些loader,有次序，从后往前执行
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: { //向html-loader传一些参数

                        }
                    },

                    //3.优化：babel支持缓存转换出的结果
                    'babel-loader?cacheDirectory'
                ],
            }
        ],
        noParse: [ //不用解析和处理的模块
            /special-library\.js$/
        ],
    },
    //配置插件
    plugins:[
    ],

    //配置寻找模块的规则
    resolve: {
        modules: [ //寻找模块的根目录
            'node_modules',
            path.resolve(__dirname,'app')  //优化：可以指明第三方模块的绝对路径，减少搜索步骤
        ],
        extensions: ['.js','.json'],
        alias: {
            'module':'new-module'
        },
        mainFields: ['main','jsnext:main']
    }
}