import mongoose, { Schema, Document, Types } from "mongoose";
import { IAuthorizationRequest } from "../types/authorizationRequest";

const requestSchema = new Schema<IAuthorizationRequest>({
  requestDate: { type: Date, default: Date.now },
  responseDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permission: { type: String, enum: ["Add", "Delete", "Update"] },
  status: { type: String, enum: ["Approved", "Denied", "Pending"] },
});

const Request = mongoose.model<IAuthorizationRequest>("Request", requestSchema);

export default Request;
