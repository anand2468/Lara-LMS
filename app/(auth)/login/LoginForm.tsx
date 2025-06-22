"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <form action={loginAction} className="lg:w-[70%] w-[400px]">

            <h1 className="lg:text-2xl text-xl font-bold text-center">WELCOME BACK </h1>
            <p className="mt-5 ml-2 ">enter your email and password</p>

            <input id="email" name="email" placeholder="Email"
                className="p-2 m-2 w-full border border-purple-800 rounded-md"/>
            {state?.errors?.email && (
                <p style={{color: 'red',margin: '0.25rem 0',fontSize: '0.875rem'
                }}>{state.errors.email}</p>
            )}

            <input id="password" name="password" type="password" placeholder="Password"
                    className="p-2 m-2 w-full border border-purple-800 rounded-md" />

            {state?.errors?.password && (
                <p style={{color: 'red',margin: '0.25rem 0',fontSize: '0.875rem'}}>
                    {state.errors.password}
                </p>
            )}
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            disabled={pending} 
            type="submit"
            className="w-full m-2 p-2 bg-purple-600 rounded-md hover:bg-purple-700 text-white text-xl active:bg-purple-800"
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}


{/* <form className=" lg:w-[70%] w-[400px]">
    <h1 className="lg:text-2xl text-xl font-bold text-center">WELCOME BACK </h1>
    <p className="mt-10 ml-2 ">enter your email and password</p>
    <input className="p-2 m-2 w-full border border-purple-800 rounded-md" type="text" name="username" id="username" placeholder="usename" /> <br />
    <input className="p-2 m-2 w-full border border-purple-800 rounded-md" type="text" name="username" id="username" placeholder="usename" /> <br />
    <input className="w-full m-2 p-2 bg-purple-600 rounded-md text-white text-xl active:bg-purple-700" type="button" value="login" />
</form> */}