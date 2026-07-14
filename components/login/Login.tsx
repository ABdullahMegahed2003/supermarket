"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

 
export default function Login() {
    const email = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetLogin({
            ...login,
            email: e.target.value,
        });
    };

    const password = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetLogin({
            ...login,
            password: e.target.value,
        });
    };

    type login = {  
        email:string,
        password:string
    }
    const [login,SetLogin]=useState<login>({
        email:"",
        password:""
})
return(
        <main className="w-11/12 h-screen mx-auto flex flex-col justify-center items-center">
            <div>
                        <Image 
                            src="/images/logo.png"
                            alt="Logo"
                            width={80}
                            height={40}
                            className="w-40 h-auto md:w-70 mb-6"
                            />
            </div>
            <div className="mb-6 text-center">
                <h2  className="text-2xl">مرحبا بعودتك</h2>
                <p className="text-gray-500 mt-6">سجل دخولك لمتابعة طلباتك</p>
            </div>
            <div className="flex flex-col h-1/6 justify-between  w-full items-center md:w-10/12 lg:h-2/9 lg:w-1/2">
                <input type="email" name="email" id=""  onChange={(e) => {
                    email(e)


                }}  placeholder="    البريد الاكترونى" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-3 "/>

                <input type="password" name="password" id=""  placeholder="     كلمةالمرور      " className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl pr-5 lg:py-3 " onChange={(e) => {
                    password(e)
                }}/>
            </div>
            <div className="mt-6">
                <Link href={"/profile"}>
                <button className="bg-green-700 px-8  py-3 duration-400 transform hover:scale-110 rounded-4xl hover:font-bold md:px-15 md:py-5 md:text-2xl lg:px-10 lg:py-3" >تسجيل الدخول</button>
                </Link>
            </div>
            <div className="mt-4">
                <h2 className="text-sm md:text-2xl">
                    ليس لديك حساب؟ 
                    <Link href={"/Register"}><strong className="text-green-800">سجل الأن</strong></Link>
                </h2>
            </div>
        </main>
        
    );
}