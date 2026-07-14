"use client";

import {
    FaUser,
    FaHeart,
    FaMapMarkerAlt,
    FaBox,
    FaCreditCard,
    FaBell,
    FaInfoCircle,
    FaPhoneAlt,
    FaSignOutAlt,
    FaArrowRight,
} from "react-icons/fa";
import { CartContext } from "@/store/idproductsReducer";
import { useContext, useState, useMemo } from "react";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";
import Nav from "@/components/NavBar/Nav";

type OrderStatus = "pending" | "approved" | "in-delivery" | "delivered";

export default function Profile() {
    const cartContext = useContext(CartContext);
    const state = cartContext?.state ?? { cart: [], orders: [] };
    const router = useRouter();
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");

    const statusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-blue-100 text-blue-800";
            case "in-delivery":
                return "bg-purple-100 text-purple-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const statusAr = (status: string) => {
        switch (status) {
            case "pending":
                return "قيد المراجعة";
            case "approved":
                return "تمت الموافقة";
            case "in-delivery":
                return "قيد التوصيل";
            case "delivered":
                return "تم الاستلام";
            default:
                return status;
        }
    };

    // Filter orders by status
    const filteredOrders = useMemo(() => {
        if (selectedStatus === "all") {
            return state.orders;
        }
        return state.orders.filter((order) => order.status === selectedStatus);
    }, [state.orders, selectedStatus]);

    // Count orders by status
    const orderCounts = useMemo(() => {
        return {
            all: state.orders.length,
            pending: state.orders.filter((o) => o.status === "pending").length,
            approved: state.orders.filter((o) => o.status === "approved").length,
            "in-delivery": state.orders.filter((o) => o.status === "in-delivery").length,
            delivered: state.orders.filter((o) => o.status === "delivered").length,
        };
    }, [state.orders]);

    const statusButtons = [
        { id: "all" as const, label: "جميع الطلبات", color: "bg-gray-600" },
        { id: "pending" as const, label: "قيد المراجعة", color: "bg-yellow-600" },
        { id: "approved" as const, label: "تمت الموافقة", color: "bg-blue-600" },
        { id: "in-delivery" as const, label: "قيد التوصيل", color: "bg-purple-600" },
        { id: "delivered" as const, label: "تم الاستلام", color: "bg-green-600" },
    ];

    return (
        <main className="w-full min-h-screen bg-slate-50">
            <Nav />
            
            {/* User Header */}
            <div className="w-full flex justify-center items-center mt-8 px-4">
                <div className="w-32 md:w-40">
                    <div className="w-full aspect-square bg-green-800 rounded-full flex justify-center items-center">
                        <FaUser className="text-white w-1/2 h-1/2" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="font-bold text-lg">عبدالله مجاهد</h2>
                        <h3 className="text-gray-500 text-sm">مستخدم</h3>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="max-w-6xl mx-auto mt-8 px-4">
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">بيانات الاتصال</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl bg-green-300 p-3 rounded-full text-white">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">العنوان</p>
                                <p className="font-semibold">كفر دميرة القديم</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-2xl bg-green-300 p-3 rounded-full text-white">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">رقم الهاتف</p>
                                <p className="font-semibold">01050908515</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="bg-white rounded-2xl shadow-md p-4 mb-8 overflow-x-auto">
                    <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap">
                        {statusButtons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setSelectedStatus(btn.id)}
                                className={`px-4 py-3 rounded-lg font-semibold text-sm transition whitespace-nowrap ${
                                    selectedStatus === btn.id
                                        ? `${btn.color} text-white shadow-md`
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {btn.label}
                                <span className="mr-2">({orderCounts[btn.id as keyof typeof orderCounts]})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                        {selectedStatus === "all" ? "جميع الطلبات" : statusAr(selectedStatus)}
                    </h2>
                    
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <FaBox className="mx-auto text-4xl text-gray-300 mb-4" />
                            <p className="text-gray-500">
                                {selectedStatus === "all" 
                                    ? "لا توجد طلبات بعد" 
                                    : `لا توجد طلبات ${statusAr(selectedStatus)}`}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">رقم الطلب: {order.id}</p>
                                            <p className="text-sm text-gray-500">التاريخ: {order.date}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(order.status)}`}>
                                            {statusAr(order.status)}
                                        </span>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                                        {order.items.map((item) => {
                                            const product = products.find((p) => p.id === item.id);
                                            return (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-700">
                                                        {product?.title} x {item.count}
                                                    </span>
                                                    <span className="font-semibold">
                                                        {(item.count * (product?.price || 0))} جنيه
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Order Info */}
                                    <div className="space-y-2 text-sm mb-4">
                                        <p className="text-gray-600">
                                            <span className="text-gray-500">العنوان:</span> {order.address}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="text-gray-500">الهاتف:</span> {order.phone}
                                        </p>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                        <span className="font-bold text-slate-900">الإجمالي:</span>
                                        <span className="text-lg font-bold text-emerald-700">{order.total} جنيه</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}