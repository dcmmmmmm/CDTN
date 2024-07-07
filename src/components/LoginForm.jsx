"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import TextInput from "./FormInput/TextInput";
import SubmitButton from "./FormInput/SubmitButton";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const searchParams = useSearchParams();
  
  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error("Sign-in error: Check your credentials");
      } else {
        // Sign-in was successful
        toast.success("Login Successful");
        reset();
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div>
        <TextInput
          label="Email"
          type="email"
          name="email"
          id="email"
          register={register}
          errors={errors}
          className="p-2"
          placeholder="name@company.com"
          required
        />
      </div>

      <div>
        <TextInput
          label="Password"
          type="password"
          name="password"
          id="password"
          register={register}
          errors={errors}
          className="p-2"
          placeholder="........"
          required
        />
      </div>
      {/* Button */}
      <div className="p-2">
        {loading ? (
          <Button
          variant = "ghost"
          disabled
          type="button"
          className="bg-black border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm text-white"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Logining, Please Wait ...
        </Button>
        ) : (
          <Button
          variant="ghost"
          type="submit"
          className="bg-black border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm text-white"
        >
          {/* <Plus className="w-5 h-5 mr-2" /> */}
          <span>Login</span>
        </Button>
        )}
      </div>
      
      {/* <Link href={"/forgot-password"} className="mt-2 text-xs px-2 hover:text-sky-500">Forgot your password</Link> */}

      <div className="flex items-center px-2 ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>
      <div className="px-2">
        <Button
          type="submit"
          onClick={() => signIn("google", {callbackUrl: "/"})}
          className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-xl text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
        >
          <FaGoogle className="mr-2 text-red-600 w-4 h-4" />
          Sign in with Google
        </Button>
        <Button
          type="submit"
          onClick={() => signIn("github", {callbackUrl: "/"})}
          className="w-full justify-center text-white bg-gray-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          {/* Icon */}
          <FaGithub className="mr-2 w-4 h-4" />
          Sign in with Github
        </Button>
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 px-2">
        Dont have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
}

