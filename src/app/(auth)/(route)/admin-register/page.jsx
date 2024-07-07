import AdminRegisterForm from "../../../../components/AdminRegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <section className="bg-[#272829] min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        {/* form */}
        <div className="sm:w-1/2 px-5">
          <h1 className="font-bold text-2xl px-1">Create an Admin account</h1>
          <p className="text-sm mt-2 px-1">If you want to be an administrator</p>
          <div className="py-4">
            <AdminRegisterForm />
          </div>
        </div>
        {/* image */}
        <div className="sm:block hidden w-1/2">
          <Image className="rounded-2xl h-full" src={"/Login.jpg"} alt="loginImage" height={900} width={900}/>
        </div> 
      </div>
    </section>
  );
}
