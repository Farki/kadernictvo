const webpack = require("webpack")
const paths = require("./paths")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack")

module.exports = {
    /**
     * Entry
     *
     * The first place Webpack looks to start building the bundle.
     */
    entry: [paths.src + "/index.js"],

    /**
     * Output
     *
     * Where Webpack outputs the assets and bundles.
     */
    output: {
        path: paths.build,
        filename: "[name].bundle.js",
        publicPath: "/",
    },

    /**
     * Plugins
     *
     * Customize the Webpack build process.
     */
    plugins: [
        /**
         * CleanWebpackPlugin
         *
         * Removes/cleans build folders and unused assets when rebuilding.
         */
        new CleanWebpackPlugin(),

        /**
         * CopyWebpackPlugin
         *
         * Copies files from target to destination folder.
         */
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: "assets/",
                    globOptions: {
                        ignore: ["*.DS_Store"],
                    },
                },
            ],
        }),

        /**
         * HtmlWebpackPlugin
         *
         * Generates an HTML file from a template.
         */
        new HtmlWebpackPlugin({
            title: "Webpack Boilerplate",
            favicon: paths.static + "/images/favicon.png",
            template: paths.src + "/template.html", // template file
            filename: "index.html", // output file
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],

    /**
     * Module
     *
     * Determine how modules within the project are treated.
     */
    module: {
        rules: [
            /**
             * JavaScript
             *
             * Use Babel to transpile JavaScript files.
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader",
                ],
            },

            /**
             * Styles
             *
             * Inject CSS into the head with source maps.
             */
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {sourceMap: true},
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true},
                    },
                ],
            },

            /**
             * Images
             *
             * Copy image files to build folder.
             */
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            context: "src", // prevent display of src/ in filename
                        },
                    },
                    {
                        loader: ImageminPlugin.loader,
                        options: {
                            bail: false,
                            cache: false,
                            imageminOptions: {
                                plugins: [
                                    [
                                        "gifsicle",
                                        {interlaced: true},
                                    ],
                                    [
                                        "jpegtran",
                                        {progressive: true},
                                    ],
                                    [
                                        "optipng",
                                        {optimizationLevel: 5},
                                    ],
                                    [
                                        "svgo",
                                        {
                                            plugins: [
                                                {
                                                    removeViewBox: false,
                                                },
                                            ],
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },

            /**
             * Fonts
             *
             * Inline font files.
             */
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "[path][name].[ext]",
                    context: "src", // prevent display of src/ in filename
                },
            },
        ],
    },
}
