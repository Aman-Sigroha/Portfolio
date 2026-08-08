import { SiLeetcode } from "react-icons/si";

export default function LeetCodeIcon({ size = 18, className = "" }) {
  return (
    <SiLeetcode
      size={size}
      className={className}
      aria-label="LeetCode"
    />
  );
}

export const LEETCODE_URL =
  "https://leetcode.com/u/Aman_Sigroha/";