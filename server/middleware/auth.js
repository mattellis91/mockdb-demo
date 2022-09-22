"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = process.env;
function verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    if (tokenHeader) {
        const token = tokenHeader.split(' ');
        const tokenContents = token[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(tokenContents, config.TOKEN_KEY);
            req.user = decoded;
            req.token = tokenContents;
        }
        catch (err) {
            return res.status(401).send("Invalid token");
        }
        return next();
    }
    return res.status(403).send("A token is required for authentication");
}
exports.verifyToken = verifyToken;
