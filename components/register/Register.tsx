"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

// Define the type for the form data outside the component
type FormData = {
    email: string;
    password: string;
    UserName: string;
    pheon: string;
    address: string;
};

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        UserName: "",
        pheon: "",
        address: "",
    });

    // A single handler for all text inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Here you would typically send the data to your API
        console.log("Form Data Submitted:", formData);
        alert("تم تسجيل البيانات، تحقق من الـ console لرؤيتها.");
    }

    return (
        <main className="w-11/12 mx-auto flex flex-col justify-center items-center py-10">
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
                <h2 className="text-2xl">إنشاء حساب جديد</h2>
                <p className="text-gray-500 mt-6">املأ البيانات التالية للتسجيل</p>
            </div>
            <div className="flex flex-col gap-4 w-full items-center md:w-10/12 lg:w-1/2">
                <input type="text" name="UserName" value={formData.UserName} onChange={handleChange} placeholder="الاسم كامل" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-2 " />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-2 " />
                <input type="tel" name="pheon" value={formData.pheon} onChange={handleChange} placeholder="رقم الهاتف" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-2" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="كلمة المرور" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-2" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="العنوان بالتفصيل" className="w-11/12 py-3 outline-1 rounded md:py-5 md:text-2xl text-right pr-5 lg:py-2" />
            </div>
            <div className="mt-6">
                <button className="bg-green-700 text-white px-8 py-3 duration-300 transform hover:scale-105 rounded-lg hover:font-bold md:px-15 md:py-5 md:text-2xl lg:px-10 lg:py-3" onClick={handleSubmit}>
                    إنشاء حساب
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-sm md:text-2xl">
                    لديك حساب بالفعل؟
                    <Link href={"/login"}><strong className="text-green-800 mr-1">سجل الدخول</strong></Link>
                </h2>
            </div>
        </main> 
    );
}