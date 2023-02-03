"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessSecretPath = void 0;
function accessSecretPath(req, res) {
    if (!req.session.user) {
        res.status(401).send({ msg: 'Unauthorized' });
        return;
    }
    res.status(200).send({ msg: 'Access granted' });
    return;
}
exports.accessSecretPath = accessSecretPath;
