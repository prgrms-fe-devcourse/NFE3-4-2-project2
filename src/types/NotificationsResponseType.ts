export interface NotificationsResponseType {
  seen: boolean;
  _id: string;
  author: {
    fullName: string
  };
  user: string;
  post?: string;
  comment?: {
    _id: string | undefined;
    comment: string | undefined;
    post: {
      _id: string | undefined;
      title: string | undefined;
      author: string | undefined;
    }
  },
  like?: {
    post: {
      title: string | undefined;
    };
    user: string | undefined;
    _id: string | undefined;
  };
  createdAt: string;
}