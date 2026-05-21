import { redirect } from "next/navigation";
import { authUrls } from "@/lib/config";

export default function Login() {
  redirect(authUrls.googleLogin);
}
