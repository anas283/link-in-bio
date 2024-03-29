"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Check, Loader2, MoveLeft, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import supabase from "@/utils/supabase";

type RegisterInputs = {
  email: string,
  password: string
}

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInputs>();
  const [isClaimed, setIsClaimed] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);

  const onSearch = (e: any) => {
    setLoading(true);
    setSearch(e.target.value);
    debouncedHandleSearch(e.target.value)
  }

  const handleSearch = async (username: string) => {
    const users = (await supabase.from('users').select()).data;

    let isUsernameExist = users?.find((data) => { 
      return data['username'] === username
    })

    if (isUsernameExist) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }

    setLoading(false);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 800), []);

  const onSubmit: SubmitHandler<RegisterInputs> = data => {
    setLoading(true);
    signUpNewUser(data);
  }

  const signUpNewUser = async (user: RegisterInputs) => {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    })

    if (data) {
      registerUsername(user.email);
    }
  }

  const registerUsername = async (email: string) => {
    const { error } = await supabase
      .from("users")
      .insert({ username: search, email: email });

    setLoading(false);

    if (!error) {
      router.push('/add-link');
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center">
      <div className="max-w-6xl flex mx-auto justify-between px-8">

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
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password && 
                  <div className="text-sm text-red-500 mt-2">Password must be at least 8 characters</div>
                }
              </div>
              <div className={`mt-4 text-sm ${watch("email") ? "invisible" : "flex"}`}>
                OR
              </div>
              <div className="mt-5">
                {watch("email") ?
                  <div>
                    <Button type="submit" disabled={loading}>
                      {loading &&
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      }
                      Create Account
                    </Button>
                  </div>
                :
                  <Button>Sign up with Google</Button>
                }
              </div>
            </form>
          :
            <div>
              <h1 className="text-3xl font-bold">First, claim your unique link</h1>
              <h6 className="text-gray-500 mt-3">The good ones are still available!</h6>
              <div className="relative">
                <Input type="email" placeholder="your-name" className="mt-5"
                  value={search}
                  onChange={onSearch}
                />
                {search &&
                  <div>
                    {loading ? (
                      <div>
                        <div className="w-4 h-4 rounded-full flex justify-center items-center absolute top-2.5 right-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        {available ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex justify-center items-center absolute top-2.5 right-3">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute top-2.5 right-3">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                }
              </div>
              <Button className={`mt-5 ${search ? "visible":"invisible"}`} onClick={() => setIsClaimed(!isClaimed)}
                disabled={loading}
              >
                Grab my link
              </Button>
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