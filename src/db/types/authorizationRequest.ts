import { Types } from "mongoose";

export interface IAuthorizationRequest extends Document {
  requestDate: Date;
  responseDate: Date;
  userId: Types.ObjectId;
  permission: "Add" | "Delete" | "Update";
  status: "Approved" | "Denied" | "Pending";
}
