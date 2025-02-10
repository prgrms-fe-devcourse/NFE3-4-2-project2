import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { getUserFollowersApi } from "@/apis/userApi";

const ParentComponent = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserFollowersApi(userId);
      setUserData(data); 
    };

    fetchData();
  }, [userId]);

  return userData ? (
    <ProfileCard user={userData} onClose={() => console.log("닫기")} />
  ) : (
    <p>로딩 중...</p>
  );
};

export default ParentComponent;
