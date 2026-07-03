"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const crudFactory_1 = require("../controllers/crudFactory");
const SEO_1 = __importDefault(require("../models/SEO"));
const router = (0, express_1.Router)();
const ctrl = (0, crudFactory_1.createCrudController)(SEO_1.default, 'SEO');
router.get('/', ctrl.getAll);
router.post('/', auth_1.protect, ctrl.create);
router.get('/:id', ctrl.getById);
router.put('/:id', auth_1.protect, ctrl.update);
router.delete('/:id', auth_1.protect, ctrl.remove);
router.patch('/:id/restore', auth_1.protect, ctrl.restore);
exports.default = router;
