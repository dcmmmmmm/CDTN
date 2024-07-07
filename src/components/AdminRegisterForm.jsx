"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import TextInput from "./FormInput/TextInput";
import SubmitButton from "./FormInput/SubmitButton";
import { Button } from "./ui/button";
export default function AdminRegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    try {
      console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
        const {data} = responseData
        
        router.push(`/login`);
        
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.message);
          toast.error("Oops Something went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div>
        <TextInput
          label=""
          type="hidden"
          name="role"
          id="role"
          defaultValue="ADMIN"
          register={register}
          errors={errors}
          className="px-2"
          required
        />
      </div>
      <div>
        <TextInput
          label="Username"
          type="text"
          name="name"
          id="username"
          register={register}
          errors={errors}
          className="px-2"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <TextInput
          label="Email"
          type="email"
          name="email"
          id="email"
          register={register}
          errors={errors}
          className="px-2"
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
          className="px-2"
          placeholder="........"
          required
        />
      </div>
      <div className="">
        <TextInput
          label="Phone Number"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          register={register}
          errors={errors}
          className="px-2"
          placeholder="012345678"
          required
        />
      </div>
      <div className="px-2">
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
          <span>Your account is registering, please wait ...!</span>
        </Button>
        ) : (
          <Button
          variant="ghost"
          type="submit"
          className="bg-black border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm text-white"
        >
          <span className="text-sm font-bold">Register</span>
        </Button>
        )}
      </div>

      <div className="flex items-center px-2 ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>

      {/* <div className="">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-xl text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
        >
          <FaGoogle className="mr-2 text-red-600 w-4 h-4" />
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="w-full justify-center text-white bg-gray-900 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          <FaGithub className="mr-2 w-4 h-4" />
          Sign up with Github
        </button>
      </div> */}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
