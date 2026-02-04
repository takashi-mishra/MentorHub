import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./userLoginForm.css";
import { useAuth } from "../../context/useAuth";
import { useNavigate, Link } from "react-router-dom";

const UserLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "http://localhost:3000/users/userRegister/user-Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      // Save token and populate auth state
      const token = result?.token || result?.accessToken || result?.data?.token;
      if (token) {
        await login(token);
        console.log("Token saved and profile fetched");
      }

      toast.success("Login successful");
      console.log(result);

      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey</p>

        <input
          type="email"
          placeholder="Email Address"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="extra-links">
          <span>Forgot password?</span>
          <Link to="/userSignUp" className="signup">Create account</Link>
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;