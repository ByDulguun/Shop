"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authRouter = (0, express_1.Router)();
// Хэрэглэгчийн мэдээллийг авах, хамгаалагдсан зам
authRouter.get("/me", controllers_1.getMe);
exports.default = authRouter;
