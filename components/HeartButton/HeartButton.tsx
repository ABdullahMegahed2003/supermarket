import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";

type HeartButtonProps = {
  id: string | number;
  onToggle?: () => void;
};

type HeartItem = {
  id: string;
  heart: boolean;
};

const getStoredHearts = (): HeartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem("heart");
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is HeartItem =>
        typeof item === "object" && item !== null && typeof item.id === "string" && typeof item.heart === "boolean"
    );
  } catch {
    return [];
  }
};

const readHeartState = (normalizedId: string) => {
  return getStoredHearts().some((item) => item.id === normalizedId && item.heart);
};

export default function HeartButton({ id, onToggle }: HeartButtonProps) {
  const normalizedId = String(id);
  const [heart, setHeart] = useState<boolean>(() => readHeartState(normalizedId));

  const toggleHeart = () => {
    const hearts = getStoredHearts();
    const exists = hearts.find((item) => item.id === normalizedId);
    const nextHeart = !heart;
    const updatedHearts = exists
      ? hearts.map((item) =>
          item.id === normalizedId ? { ...item, heart: nextHeart } : item
        )
      : [...hearts, { id: normalizedId, heart: nextHeart }];

    window.localStorage.setItem("heart", JSON.stringify(updatedHearts));
    setHeart(nextHeart);

    if (onToggle) {
      onToggle();
    }

    window.dispatchEvent(new Event("heartUpdated"));
  };

  return (
    <div
      className="border p-1.5 rounded cursor-pointer"
      onClick={() => {
        toggleHeart();

        if (!heart) {
          toast.success("تمت إضافة المنتج", {
            description: "يمكنك مراجعة المفضلة الآن",
          });
        } else {
          toast.success("تم حذف المنتج من المفضلة");
        }
      }}
    >
      {heart ? (
        <FaHeart className="text-red-500 text-2xl" />
      ) : (
        <FiHeart className="text-2xl" />
      )}
    </div>
  );
}