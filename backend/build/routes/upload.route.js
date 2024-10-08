"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// uploadRoutes.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload_contoller_1 = require("../controllers/upload/upload.contoller");
const uploadRouter = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Define the upload route
uploadRouter.post("/upload", upload.single("ProductImage"), upload_contoller_1.uploadFile);
exports.default = uploadRouter;