"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("@/utils/request");
const getPageListApiHr = async (ctx) => {
    const { url } = ctx.request.body; //获取post提交的数据
    const detail = await request_1.request.get(`${url.replace(".git", "")}/raw/master/readme.md`);
    ctx.response.body = {
        status: 1,
        code: "200",
        data: {
            code: "200",
            content: detail,
        },
    };
};
exports.default = getPageListApiHr;
//# sourceMappingURL=getPluginDetailHr.js.map