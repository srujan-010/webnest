"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const crudFactory_1 = require("../controllers/crudFactory");
const Contact_1 = __importDefault(require("../models/Contact"));
const router = (0, express_1.Router)();
const ctrl = (0, crudFactory_1.createCrudController)(Contact_1.default, 'Contact');
router.get('/', ctrl.getAll);
router.post('/', ctrl.create); // Anyone should be able to POST a contact form inquiry!
router.get('/:id', auth_1.protect, ctrl.getById);
router.put('/:id', auth_1.protect, ctrl.update);
router.delete('/:id', auth_1.protect, ctrl.remove);
router.patch('/:id/restore', auth_1.protect, ctrl.restore);
exports.default = router;
