// import path from 'path';
// import { merge } from 'webpack-merge';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import {serverConfig} from "./apps/server/webpack.part";
import {webAppConfig} from "./apps/web_app/webpack.part";
import {commonConfig} from "./webpack.common";

export default [
    /** server  **/ {...commonConfig, ...serverConfig},
    /** web_app **/ {...commonConfig, ...webAppConfig},
]