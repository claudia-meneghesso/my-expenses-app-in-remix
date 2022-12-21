import { FC } from "react";

import AuthForm from "~/components/auth/AuthForm";

import { validateCredentials } from "~/data/validation.server";

import styles from "~/styles/auth.css";

export const AuthPage: FC = () => <AuthForm />;

export default AuthPage;

export const links = () => [{ rel: "stylesheet", href: styles }];

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  if (authMode === "login") {
  } else {
  }
};
