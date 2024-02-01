'use client';

import ClaimUsername from "@/components/claimUsername";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import ActionBar from "@/components/actionBar";

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
            <div className="min-h-screen min-w-screen">
              <div className="max-w-6xl flex mx-auto flex-wrap py-10">

                <div className="w-full md:w-1/4">
                  {/* upload avatar box */}
                  <div className="w-44 h-44 border-2 border-dashed bg-gray-50 rounded-full flex justify-center items-center cursor-pointer">
                    <div>
                      <Upload className="w-10 h-h-10 text-gray-400 flex mx-auto" />
                      <h6 className="text-sm text-gray-500 font-medium mt-2">Add Avatar</h6>
                    </div>
                  </div>

                  {/* name and bio */}
                  <div className="mt-10">
                    <Textarea 
                      placeholder="Your name"
                      className="text-4xl placeholder:text-gray-400 font-bold p-0 border-none shadow-none focus-visible:ring-0 resize-none"
                    />
                    <Textarea 
                      placeholder="Your bio"
                      className="text-md placeholder:text-gray-400 p-0 border-none shadow-none focus-visible:ring-0 resize-none"
                    />
                  </div>
                </div>

                <div className="w-full md:w-3/4 flex flex-wrap gap-10">

                  {/* twitter card */}
                  <div className="w-44 h-44 border rounded-2xl shadow-sm p-4">
                    Twitter
                  </div>

                  {/* instagram card */}
                  <div className="w-44 h-44 border rounded-2xl shadow-sm p-4">
                    Instagram
                  </div>

                </div>

              </div>

              <ActionBar />
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