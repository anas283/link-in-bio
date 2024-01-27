'use client';

import ClaimUsername from "@/components/claimUsername";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const usernames = ['user1', 'user2'];
  const [isUserExist, setIsUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    // check if username exist
    if (usernames.includes(username)) {
      setIsUserExist(true);
    } else {
      setIsUserExist(false);
    }
    setIsLoading(false);
  },[]);

  return (
    <div>
      {!isLoading && (
        <div>
          {isUserExist ?
            <div>
              User exist
            </div>
          :
            <ClaimUsername />
          }  
        </div>
      )}
    </div>
  )
}

export default Profile;