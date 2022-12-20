import { FC } from "react";

import styles from "~/styles/auth.css";

export const AuthPage: FC = () => <h1>Auth page</h1>;

export default AuthPage;

export const links = () => [{ rel: "stylesheet", href: styles }];
