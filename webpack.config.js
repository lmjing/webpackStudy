const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/components/app.js', // single entry 모든 것의 시작점
    output: {
        // path.resolve(__dirname) 는 node.js 문법
        path: path.resolve(__dirname, "dist"), // bundling target - 번들링된 타겟을 dist 타겟에 넣겠다.
        filename: "[name].[hash].js" // bundling file name - 번들링한 파일 이름
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules)/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader" // compiles sass to CSS, using
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        /*
        기존 방식은 해시가 계속 변경되어 최근 생성된 main dist를 찾지 못함
        누군가 만들어놓은 html-webpack-plugin을 사용해서 자동으로 index.html 파일이 dist에 생성되고 맨 아래줄에 최근 main.[hash].js 파일을
        자동으로 찾아 작성해놓음
         */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
