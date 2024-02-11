"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TwitterLogo from "../../../public/twitter-logo.png";
import InstagramLogo from "../../../public/instagram-logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import LinkCard from "@/components/linkCard";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";

type LinkInputs = {
  twitter: string,
  instagram: string
}

const AddLink = () => {
  const { register, watch, getValues } = useForm<LinkInputs>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [links, setLinks] = useState<any>([]);
  const router = useRouter();

  const addSocialLink = (social: string) => {
    if (social === 'twitter') {
      setLinks([
        ...links, 
        {
          social: social,
          image: TwitterLogo,
          username: getValues("twitter"),
          link: "https://twitter.com/" + getValues("twitter"),
        }
      ])
    }
    else if (social === 'instagram') {
      setLinks([
        ...links, 
        {
          social: social,
          image: InstagramLogo,
          username: getValues("instagram"),
          link: "https://www.instagram.com/" + getValues("instagram"),
        }
      ])
    }
  }

  const next = async () => {
    setIsCompleted(!isCompleted);

    const { error } = await supabase
      .from('users')
      .update({ links: JSON.stringify(links) })
      .eq('id', 5)

    console.log(error);
  }

  const goToProfile = () => {
    const username = "test";
    router.push('/' + username);
  }

  return (
    <div className="min-h-screen min-w-screen">
      <div className="max-w-6xl flex flex-wrap mx-auto pt-16 px-8 md:lg-0">
        
        {isCompleted ?
          <div>
            <h1 className="text-2xl font-bold">Looks great!</h1>
            <h6 className="text-gray-500 mt-3">
              You can keep customising your profile and
              then share it with the world!
            </h6>
            <Button className="mt-3" onClick={() => goToProfile()}>Go to profile</Button>
          </div>
        :
          <div className="w-full lg:w-1/3 pr-10">
            <h1 className="text-2xl font-bold">Now, let’s add your social media accounts to your page.</h1>
            <div className="mt-10">

              {/* twitter */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row relative">
                  <Image src={TwitterLogo} className="rounded-lg w-10 h-10" alt="twitter" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-10 text-sm placeholder:text-gray-400"
                    {...register('twitter')}
                  />
                  {watch('twitter') && 
                    <Button className="bg-green-500 hover:bg-green-600 absolute top-1.5 right-1.5 w-10 h-7 text-xs"
                      onClick={() => addSocialLink('twitter')}
                    >
                      Add
                    </Button>
                  }
                </div>
              </div>

              {/* instagram */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row relative">
                  <Image src={InstagramLogo} className="rounded-lg w-10 h-10" alt="twitter" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-10 text-sm placeholder:text-gray-400"
                    {...register('instagram')}
                  />
                  {watch('instagram') &&
                    <Button className="bg-green-500 hover:bg-green-600 absolute top-1.5 right-1.5 w-10 h-7 text-xs"
                      onClick={() => addSocialLink('instagram')}
                    >
                      Add
                    </Button>
                  }
                </div>
              </div>

            </div>

            <div className="mt-12">
              <Button className="mr-3" onClick={() => next()}>Next</Button>
              <Button variant="ghost" onClick={() => setIsCompleted(!isCompleted)}>Skip</Button>
            </div>

          </div>
        }
        <div className="w-full lg:w-2/3 pr-10">
          <h1 className="text-2xl font-bold text-center">Your page</h1>
          <div className="flex flex-wrap mt-3">

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

      </div>
    </div>
  )
}

export default AddLink