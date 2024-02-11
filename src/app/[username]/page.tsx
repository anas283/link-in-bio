'use client';

import ClaimUsername from "@/components/claimUsername";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Upload } from 'lucide-react';
import ActionBar from "@/components/actionBar";
import supabase from "@/utils/supabase";
import LinkCard from "@/components/linkCard";
import TextareaAutosize from 'react-autosize-textarea';
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";

type UserInputs = {
  name: string;
  bio: string;
}

const Profile = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<any>([]);

  const { register, setValue } = useForm<UserInputs>();

  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    checkIfUsernameExist();    
  },[]);

  const checkIfUsernameExist = async () => {
    const users = (await supabase.from('users').select()).data;

    let isUsernameExist = users?.find((data) => { 
      return data['username'] === username
    })

    if (isUsernameExist) {
      const linksData = isUsernameExist['links'];
      const formattedLinks = JSON.parse(linksData);
      setLinks(formattedLinks);
      
      setValue("name", isUsernameExist["name"]);
      setValue("bio", isUsernameExist["bio"]);

      setIsUserExist(true);
    } else {
      setIsUserExist(false);
    }
    setIsLoading(false);
  }

  const saveNameAndBio = async (text: string, type: string) => {
    if (type === 'name') {
      const { error } = await supabase
        .from('users')
        .update({ name: text })
        .eq('username', username)

      console.log(error);
    }
    else if (type === 'bio') {
      const { error } = await supabase
        .from('users')
        .update({ bio: text })
        .eq('username', username)

      console.log(error);
    }
  }

  const onUserInput = (e: any, type: string) => {
    debouncedHandleSearch(e.target.value, type)
  }

  const debouncedHandleSearch = useCallback(debounce(saveNameAndBio, 800), []);

  return (
    <div>
      {!isLoading && (
        <div>
          {isUserExist ?
            <div className="min-h-screen min-w-screen">
              <div className="max-w-6xl flex mx-auto flex-wrap py-10 px-5 lg:px-0">

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
                    <TextareaAutosize
                      placeholder="Your name"
                      {...register("name")}
                      onChange={(e) => onUserInput(e, 'name')}
                      className="max-w-[288px] text-4xl placeholder:text-gray-400 font-bold p-0 border-none shadow-none focus-visible:ring-0 resize-none"
                    />
                    <TextareaAutosize
                      placeholder="Your bio"
                      {...register("bio")}
                      onChange={(e) => onUserInput(e, 'bio')}
                      className="max-w-[288px] text-md placeholder:text-gray-400 p-0 border-none shadow-none focus-visible:ring-0 resize-none mt-3"
                    />
                  </div>
                </div>

                <div className="w-full md:w-3/4 flex flex-wrap gap-10">
                  {links?.map((data: any) => (
                    <LinkCard 
                      key={data.link} 
                      social={data.social}
                      image={data.image}
                      username={data.username}
                      link={data.link}
                    />
                  ))}
                </div>

              </div>

              <ActionBar />
            </div>
          :
            <ClaimUsername username={username} />
          }  
        </div>
      )}
    </div>
  )
}

export default Profile;