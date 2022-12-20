import { Outlet } from "@remix-run/react";

import MainHeader from "~/components/navigation/MainHeader";

import styles from "~/styles/marketing.css";

const MarketingLayout = () => (
  <>
    <MainHeader />
    <main>
      <Outlet />
    </main>
  </>
);

export default MarketingLayout;

export const links = () => [{ rel: "stylesheet", href: styles }];
