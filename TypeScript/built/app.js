"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./api");
const helper = require("./helper");
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        let urls = yield api.get_index_urls();
        for (let i = 0; i < urls.length; i++) {
            yield helper.wait_seconds(1);
            yield api.fetch_content(urls[i]);
        }
    }
    catch (err) {
        console.log(err);
    }
    console.log('完毕！');
}))();
