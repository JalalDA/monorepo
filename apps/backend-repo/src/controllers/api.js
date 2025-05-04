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
exports.createUserDataHandler = exports.updateUserDataHandler = exports.fetchUserData = void 0;
const userCollection_1 = require("../repository/userCollection");
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        if (uid)
            res.status(401).json({ message: "Unauthorized" });
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const user = yield (0, userCollection_1.getPaginatedUserDocs)(page, limit);
        if (!user)
            res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
});
exports.fetchUserData = fetchUserData;
const updateUserDataHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        yield (0, userCollection_1.updateUserData)(uid, req.body);
        res.json({ message: "User data updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user data", error });
    }
});
exports.updateUserDataHandler = updateUserDataHandler;
const createUserDataHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.body.uid;
        const data = yield (0, userCollection_1.createUserData)(uid, req.body);
        res.json({ message: "User data created successfully", data });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user data", error });
    }
});
exports.createUserDataHandler = createUserDataHandler;
