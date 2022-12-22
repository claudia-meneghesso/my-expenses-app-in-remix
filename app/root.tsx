import { FC, ReactNode } from "react";
import type { MetaFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import Error from "~/components/util/Error";

import styles from "~/styles/shared.css";

interface DocumentProps {
  title?: string;
  children: ReactNode;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My Expenses App",
  viewport: "width=device-width,initial-scale=1",
});

const Document: FC<DocumentProps> = ({ title, children }) => (
  <html lang="en">
    <head>
      {title && <title>{title}</title>}
      <Meta />
      <Links />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const links = () => [{ rel: "stylesheet", href: styles }];

//Returns the Remix error object
export const CatchBoundary = () => {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>
            {caughtResponse.data?.message ||
              "Something went wrong! Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
};

// Return all other generated errors (unhandled errors)
export const ErrorBoundary = ({ error }) => {
  return (
    <Document title="Error">
      <main>
        <Error title="Error">
          <p>
            {error.message || "Something went wrong! Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
};
