"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Link } from "@/i18n/navigation";

export default function SignInForm() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      <SignIn
        appearance={{
          elements: {
            cardBox: {
              boxShadow: "none",
            },
            formContainer: {},
            footer: {
              display: "none",
            },
          },
          baseTheme: currentTheme === "dark" ? dark : undefined,
        }}
      />
      <p className="text-[14px] text-center mt-4">
        Don{"'"}t have an account?{" "}
        <Link className="hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </div>
  );
}
