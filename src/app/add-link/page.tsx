"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AddLink = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="min-h-screen min-w-screen">
      <div className="max-w-6xl flex mx-auto justify-between pt-16">
        
        {isCompleted ?
          <div>
            <h1 className="text-2xl font-bold">Looks great!</h1>
            <h6 className="text-gray-500 mt-3">
              You can keep customising your profile and
              then share it with the world!
            </h6>
            <Button className="mt-3">Go to profile</Button>
          </div>
        :
          <div className="w-1/3 pr-10">
            <h1 className="text-2xl font-bold">Now, let’s add your social media accounts to your page.</h1>
            <div className="mt-10">

              {/* twitter */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row">
                  <img src="https://placehold.co/50x50" alt="image" className="rounded-lg w-12 h-12" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-12 text-md placeholder:text-gray-400" />
                </div>
              </div>

              {/* instagram */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row">
                  <img src="https://placehold.co/50x50" alt="image" className="rounded-lg w-12 h-12" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-12 text-md placeholder:text-gray-400" />
                </div>
              </div>

              {/* linkedin */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row">
                  <img src="https://placehold.co/50x50" alt="image" className="rounded-lg w-12 h-12" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-12 text-md placeholder:text-gray-400" />
                </div>
              </div>

              {/* github */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row">
                  <img src="https://placehold.co/50x50" alt="image" className="rounded-lg w-12 h-12" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-12 text-md placeholder:text-gray-400" />
                </div>
              </div>

              {/* youtube */}
              <div className="flex flex-row mt-3">
                <div className="flex flex-row">
                  <img src="https://placehold.co/50x50" alt="image" className="rounded-lg w-12 h-12" />
                  <Input type="text" placeholder="@username" className="w-72 ml-3 h-12 text-md placeholder:text-gray-400" />
                </div>
              </div>
  
            </div>

            <div className="mt-12">
              <Button className="mr-3" onClick={() => setIsCompleted(!isCompleted)}>Sign up with Google</Button>
              <Button variant="ghost" onClick={() => setIsCompleted(!isCompleted)}>Skip</Button>
            </div>

          </div>
        }
        <div className="w-2/3 pr-10">
          <h1 className="text-2xl font-bold text-center">Your page</h1>
          <div className="flex flex-wrap mt-3">

            {/* twitter card */}
            <div className="w-40 h-40 border rounded-2xl shadow-sm p-4 m-2">
              Twitter
            </div>

            {/* instagram card */}
            <div className="w-40 h-40 border rounded-2xl shadow-sm p-4 m-2">
              Instagram
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AddLink