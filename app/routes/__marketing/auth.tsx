import { FC } from "react";

import AuthForm from "~/components/auth/AuthForm";

import styles from "~/styles/auth.css";

export const AuthPage: FC = () => <AuthForm />;

export default AuthPage;

export const links = () => [{ rel: "stylesheet", href: styles }];
