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
exports.createUserData = exports.updateUserData = exports.getPaginatedUserDocs = exports.getUserData = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const USERS_COLLECTION = "users";
const getUserData = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebaseConfig_1.db.collection(USERS_COLLECTION).doc(uid).get();
    return doc.exists ? doc.data() : null;
});
exports.getUserData = getUserData;
const getPaginatedUserDocs = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebaseConfig_1.db.collection("users").get();
    const scoredUsers = snapshot.docs.map(doc => {
        var _a, _b, _c;
        const data = doc.data();
        const score = ((_a = data.totalAverageWeightRatings) !== null && _a !== void 0 ? _a : 0) * 1000000 +
            ((_b = data.numberOfRents) !== null && _b !== void 0 ? _b : 0) * 1000 +
            ((_c = data.recentlyActive) !== null && _c !== void 0 ? _c : 0);
        return Object.assign(Object.assign({ id: doc.id }, data), { score });
    });
    const sorted = scoredUsers.sort((a, b) => b.score - a.score);
    const paginated = sorted.slice((page - 1) * limit, page * limit);
    return {
        users: paginated,
        totalUsers: sorted.length,
        currentPage: page
    };
});
exports.getPaginatedUserDocs = getPaginatedUserDocs;
const updateUserData = (uid, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.db.collection(USERS_COLLECTION).doc(uid).update(userData);
});
exports.updateUserData = updateUserData;
const createUserData = (uid, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebaseConfig_1.db.collection(USERS_COLLECTION).doc(uid).set(userData);
});
exports.createUserData = createUserData;
