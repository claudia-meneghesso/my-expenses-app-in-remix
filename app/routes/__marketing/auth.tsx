import { redirect } from "@remix-run/node";
import { FC } from "react";

import AuthForm from "~/components/auth/AuthForm";

import { signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";

import styles from "~/styles/auth.css";
import { User } from "~/types/user";

export const AuthPage: FC = () => <AuthForm />;

export default AuthPage;

export const links = () => [{ rel: "stylesheet", href: styles }];

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  const credentials = Object.fromEntries(formData) as User;

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return null;
    } else {
      await signup(credentials);

      return redirect("/expenses");
    }
  } catch (error) {
    if (error.status === 422) {
      return {
        credentials: error.message,
      };
    }
  }
};
