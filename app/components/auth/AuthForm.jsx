import { FaLock, FaUserPlus } from "react-icons/fa";

import { Link, useSearchParams } from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();

  const authMode = searchParams.get("mode") || "login";

  const isLogIn = authMode === "login";

  const submitBtnCaption = isLogIn ? "Login" : "Register";

  const toggleBtnCaption = isLogIn
    ? "Create a new user"
    : "Log in with existing user";

  return (
    <form method="post" className="form" id="auth-form">
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
        <button>{submitBtnCaption}</button>
        <Link to={isLogIn ? "?mode=signup" : "?mode=login"}>
          {toggleBtnCaption}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
