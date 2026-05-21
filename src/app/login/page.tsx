import { redirect } from "next/navigation";
import { getGoogleLoginUrl } from "@/lib/config";

export default function Login() {
  redirect(getGoogleLoginUrl());
}
