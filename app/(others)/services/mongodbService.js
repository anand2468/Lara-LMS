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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//const { MongoClient, ObjectId } = require("mongodb");
var mongodb_1 = require("mongodb");
// Optimized version with connection pooling for multiple calls
var MongoService = /** @class */ (function () {
    function MongoService(uri, dbName, collectionName) {
        if (uri === void 0) { uri = "mongodb://localhost:27017"; }
        if (dbName === void 0) { dbName = "lara-lms"; }
        if (collectionName === void 0) { collectionName = "questions"; }
        this.uri = uri;
        this.dbName = dbName;
        this.client = undefined;
        this.collectionName = collectionName;
    }
    MongoService.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 2];
                        this.client = new mongodb_1.MongoClient(this.uri);
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.client.db(this.dbName).collection(this.collectionName)];
                }
            });
        });
    };
    MongoService.prototype.fetchUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        collection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, collection.findOne({ email: email })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user ? { success: true, user: user } : { success: false, message: "user not found" }];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching user data:", error_1);
                        return [2 /*return*/, { success: false, message: "error" }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoService.prototype.fetchRandomQuestions = function (inputArray) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, output, _i, inputArray_1, entry, topic, no_of_questions, questions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        collection = _a.sent();
                        output = [];
                        _i = 0, inputArray_1 = inputArray;
                        _a.label = 2;
                    case 2:
                        if (!(_i < inputArray_1.length)) return [3 /*break*/, 7];
                        entry = inputArray_1[_i];
                        topic = entry.topic, no_of_questions = entry.no_of_questions;
                        if (!topic || !no_of_questions || no_of_questions <= 0 || no_of_questions > 25) {
                            return [3 /*break*/, 6];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.aggregate([
                                { $match: { topic: topic } },
                                { $sample: { size: no_of_questions } }
                            ]).toArray()];
                    case 4:
                        questions = _a.sent();
                        output.push({
                            topic: topic,
                            questions: questions.map(function (q) { return q._id; }),
                            answers: questions.map(function (q) { return q.answer; })
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Error for topic ".concat(topic, ":"), error_2);
                        output.push({
                            topic: topic,
                            questions: [],
                            answers: []
                        });
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, output];
                }
            });
        });
    };
    MongoService.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.close()];
                    case 1:
                        _a.sent();
                        this.client = undefined;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return MongoService;
}());
// Test function to verify the schema
function testWithSampleData() {
    return __awaiter(this, void 0, void 0, function () {
        var inputArray, userdata, service, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputArray = [
                        { "topic": "old", "no_of_questions": 5 },
                        { "topic": "new", "no_of_questions": 5 }
                    ];
                    userdata = { "email": "admin@laralms.com" };
                    service = new MongoService("mongodb://localhost:27017", "lara-lms", "users");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 5]);
                    return [4 /*yield*/, service.fetchUser("admin@laralms.com")];
                case 2:
                    result = _a.sent();
                    console.log("Test result:", result);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, service.close()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
testWithSampleData();
module.exports = { MongoService: MongoService };
