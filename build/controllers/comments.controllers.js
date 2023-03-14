"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComments = exports.updateComments = exports.createComments = exports.getComment = exports.getComments = void 0;
const db_1 = require("../db");
// Get comments
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.pool.query('SELECT * FROM comments ORDER BY createdAt ASC');
    res.json(result);
});
exports.getComments = getComments;
// Get comment by id
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const [result] = yield db_1.pool.query(`SELECT * FROM comments WHERE id = ${id}`); // Resolver types
    if (!result.length)
        return res.status(404).json({ error: 'comment not found' });
    res.json(result[0]);
});
exports.getComment = getComment;
// Create comment
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const [newComment] = yield db_1.pool.query('INSERT INTO comments (content) VALUES (?)', [data.content]); // Arreglar type
    const [result] = yield db_1.pool.query(`SELECT * FROM comments WHERE id = ${newComment.insertId}`); // Resolver types
    res.status(201).json(result[0]);
});
exports.createComments = createComments;
// Update comment
const updateComments = (req, res) => {
    const id = req.params.id;
    res.json(`Update Comment ${id}`);
};
exports.updateComments = updateComments;
// Delete comment
const deleteComments = (req, res) => {
    const id = req.params.id;
    res.json(`Delete Comment ${id}`);
};
exports.deleteComments = deleteComments;
