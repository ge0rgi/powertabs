import Vue from 'vue'
import Powertabs from "./Powertabs";

global.browser = require('webextension-polyfill');

    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        render: h => h(Powertabs)
    });