"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorException = void 0;
class errorException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.errorException = errorException;
;
