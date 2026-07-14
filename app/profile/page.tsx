import type { Metadata } from "next";
import Checkout from "./Checkout";
import Profile from "@/components/profile/Profile";

export const metadata: Metadata = {
  title: "البروفايل",
  description: "صفحة البروفايل والطلبات",
};

export default function ProfilePage() {
  return <Profile />;
}