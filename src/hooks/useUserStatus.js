import { useEffect, useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

const useUserStatus = () => {
  const user = useCurrentUser();
  const [userStatus, setUserStatus] = useState("");

  const userId = user?.pk;

  useEffect(() => {
    const getUserStatus = async () => {
      try {
        const { data } = await axiosReq.get(`user_status/`);
        setUserStatus(data.staff_status.is_staff);
      } catch (err) {
        console.log(err);
      }
    };
    getUserStatus();
  }, [userId]);
  return userStatus;
};

export default useUserStatus;
