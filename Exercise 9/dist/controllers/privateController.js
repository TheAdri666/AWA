"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = void 0;
function access(req, res) {
    const token = Object.assign({}, req.token);
    res.json({ email: token.email });
}
exports.access = access;
