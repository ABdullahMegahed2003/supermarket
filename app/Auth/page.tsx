import type { Metadata } from "next";
import Login from "@/components/login/Login";

export const metadata: Metadata = {
    title: "تسجيل الدخول",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Auth(){
    return(
        <Login/>
    )
}
