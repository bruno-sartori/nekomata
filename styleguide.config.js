const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  require: [path.join(__dirname, './src/styles/style.scss')],
  components: "src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").withCustomConfig(
    './tsconfig.json'
  ).parse,
  ignore: ['**/*.d.ts', '**/*.ts'],
  webpackConfig: {
    plugins: [new MiniCssExtractPlugin()],
    resolve: {
      alias: {
        '@public': path.resolve(__dirname, 'public'),
        '@images': path.resolve(__dirname, 'src', 'assets', 'images'),
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@containers': path.resolve(__dirname, 'src', 'containers'),
        '@layouts': path.resolve(__dirname, 'src', 'layouts'),
        '@pages': path.resolve(__dirname, 'src', 'pages'),
        '@scenes': path.resolve(__dirname, 'src', 'scenes'),
        '@services': path.resolve(__dirname, 'src', 'services'),
        '@store': path.resolve(__dirname, 'src', 'store'),
        '@actions': path.resolve(__dirname, 'src', 'store', 'actions'),
        '@reducers': path.resolve(__dirname, 'src', 'store', 'reducers'),
        '@selectors': path.resolve(__dirname, 'src', 'store', 'selectors'),
        '@styles': path.resolve(__dirname, 'src', 'styles'),
        '@utils': path.resolve(__dirname, 'src', 'utils'),

        // Sass specific aliases
        'images': path.resolve(__dirname, 'src', 'assets', 'images'),
        'styles': path.resolve(__dirname, 'src', 'styles'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            esModule: false
          }
        },
        {
          test: /\.tsx/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {

                import: false,
                modules: true,
                camelCase: true,
                localIdentName: '[local]'
              }
            },
            "sass-loader"
          ]
        }
      ]
    }
  }
};
