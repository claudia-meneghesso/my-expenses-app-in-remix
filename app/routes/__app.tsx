import { Outlet } from "@remix-run/react";

import styles from "~/styles/expenses.css";

const ExpensesAppLayout = () => <Outlet />;

export default ExpensesAppLayout;

export const links = () => [{ rel: "stylesheet", href: styles }];
