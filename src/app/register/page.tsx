"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MoveLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterInputs = {
  email: string,
  password: string
}

const Register = () => {
  const { register, handleSubmit, watch } = useForm<RegisterInputs>();
  const [isClaimed, setIsClaimed] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = data => console.log(data);

  return (
    <div className="min-h-screen min-w-screen flex items-center">
      <div className="w-full max-w-5xl flex mx-auto justify-between ">
        
        <div className="w-1/2 pr-10 flex items-center">
          {isClaimed ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button variant="ghost" onClick={() => setIsClaimed(!isClaimed)} className="p-0 hover:bg-transparent">
                <MoveLeft className="h-6 w-6" />
              </Button>
              <h6 className="text-gray-500 mt-3">link.me/username is yours!</h6>
              <h1 className="text-3xl font-bold">Now, create your account.</h1>
              <div>
                <Input type="email" placeholder="Email" className="mt-5"
                  {...register("email")}
                />
                <Input type="password" placeholder="Password" className="mt-5"
                  {...register("password")}
                />
              </div>
              <div className={`mt-4 text-sm ${watch("email") ? "invisible" : "flex"}`}>
                OR
              </div>
              <div className="mt-5">
                {watch("email") ?
                  <Button type="submit">Create Account</Button>
                :
                  <Button>Sign up with Google</Button>
                }
              </div>
            </form>
          :
            <div>
              <h1 className="text-3xl font-bold">First, claim your unique link</h1>
              <h6 className="text-gray-500 mt-3">The good ones are still available!</h6>
              <Input type="email" placeholder="your-name" className="mt-5" />
              <Button className="mt-5" onClick={() => setIsClaimed(!isClaimed)}>Grab my link</Button>
            </div>
          }
        </div>

        <div className="w-1/2 pl-10">
          <img src="https://placehold.co/600x400" alt="image" className="rounded-lg" />
        </div>

      </div>
    </div>
  )
}

export default Register;