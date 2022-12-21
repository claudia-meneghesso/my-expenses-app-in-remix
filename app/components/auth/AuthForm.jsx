import { FaLock, FaUserPlus } from "react-icons/fa";

import { Form, Link, useSearchParams, useTransition } from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode") || "login";

  const isLogIn = authMode === "login";

  const submitBtnCaption = isLogIn ? "Login" : "Register";

  const toggleBtnCaption = isLogIn
    ? "Create a new user"
    : "Log in with existing user";

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">{isLogIn ? <FaLock /> : <FaUserPlus />}</div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{isSubmitting ? "Authentication..." : submitBtnCaption}</button>
        <Link to={isLogIn ? "?mode=signup" : "?mode=login"}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  const credentials = Object.fromEntries(formData);

  if (authMode === "login") {
  } else {
  }
};
