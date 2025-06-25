import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="lg:grid lg:grid-cols-2 h-[100vh]">
      <div className="lg:bg-purple-200 flex justify-center lg:items-center sm:mt-[220px] lg:mt-0">
        <h1 className="text-5xl m-2 font-bold text-purple-800 "> LARA-LMS </h1>
      </div>
      <div className="flex justify-center lg:items-center sm:h-[100vh] md:h-[100vh]lg:mt-0 ">
        <LoginForm />
      </div>
    </div>
  );
}