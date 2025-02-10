import {NotificationsResponseType} from "@/types/NotificationsResponseType";
import {NotificationsResponseWithReturnValue} from "@/types/NotificationsResponseWithReturnValue";
import CalcCreateTimeToLocalTime from "@/components/CalcCreateTimeToLocalTime";
type ReturnValue = {
  type: "COMMENT" | "LIKE";
}
export default function NotificationExtractData (data: NotificationsResponseType[]){
  const NotificationMap = data.map((e): NotificationsResponseWithReturnValue => {
    const isType:ReturnValue = {type: "COMMENT"}
    if(e?.comment === undefined){
      isType.type = "LIKE";
    } else {

    }
    const returnValue: NotificationsResponseWithReturnValue = {
      seen: e.seen,
      type: isType.type,
      _id: e._id,
      author: {
        fullName: e.author.fullName
      },
      user: e.user,
      post: e.post,
      comment: {
        _id: e.comment?._id,
        comment: e.comment?.comment,
        post: {
          _id: e.comment?.post._id,
          title: e.comment?.post.title,
          author: e.comment?.post.author,
        },
      },
      like: {
        post: {
          title: e.like?.post.title
        },
        user: e.like?.user,
        _id: e.like?._id
      },
      createdAt: CalcCreateTimeToLocalTime(e.createdAt),
    };
    return returnValue
  })
  return NotificationMap
}