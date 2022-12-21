import { FaLock, FaUserPlus } from "react-icons/fa";

import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useTransition,
} from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode") || "login";

  const isLogIn = authMode === "login";

  const submitBtnCaption = isLogIn ? "Login" : "Register";

  const toggleBtnCaption = isLogIn
    ? "Create a new user"
    : "Log in with existing user";

  const navigation = useTransition();

  const isSubmitting = navigation.state !== "idle";

  const validationErrors = useActionData();

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
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
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
