import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Later you'll check credentials + role with backend.
    // For now, just route based on selected role.
    if (role === "staff") {
      navigate("/staff");
    } else {
      navigate("/adopt");
    }
  }

  return (
    <section className="w-full space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">
        Sign in
      </h1>

      <p className="text-sm text-slate-600">
        Choose your role and sign in. Staff members can review and approve adoption appointments.
      </p>

      <div className="bg-white shadow-sm w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4"
        >
          {/* Role selection */}
          <div>
            <p className="text-xs font-medium text-slate-700 mb-1">
              I am signing in as:
            </p>

            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                <span>User</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="staff"
                  checked={role === "staff"}
                  onChange={() => setRole("staff")}
                />
                <span>Staff member</span>
              </label>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
