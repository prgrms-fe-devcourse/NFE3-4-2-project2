import {NotificationsResponseType} from "@/types/NotificationsResponseType";

export type NotificationsResponseWithReturnValue = NotificationsResponseType & {
  type: "COMMENT" | "LIKE";
}