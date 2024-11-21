import { useRouter } from "next/navigation";

export const Logout = () => {
    const router=useRouter()
  localStorage.removeItem("stk-apk");
  router.push("/createAccount/Login");
};
