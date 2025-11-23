"use client";
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Link } from "@/i18n/navigation";

export default function SignUpForm() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      <SignUp
        appearance={{
          elements: {
            cardBox: {
              boxShadow: "none",
            },
            footer: {
              display: "none",
            },
          },
          baseTheme: currentTheme === "dark" ? dark : undefined,
        }}
      />

      <p className="text-[14px] px-2 text-center mt-4">
        By Continue, you accept our{" "}
        <Link
          className="hover:underline font-bold"
          href="/terms"
          target="_blank"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          className="hover:underline font-bold"
          href="/privacy"
          target="_blank"
        >
          Privacy Policy
        </Link>{" "}
        .
      </p>
      <p className="text-[14px] mt-2 text-center">
        Already have an account?
        <Link className="hover:underline" href="/sign-in">
          {" "}
          Sign in
        </Link>
      </p>
    </div>
  );
}
