import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import "./MentorLoginForm.css";
import { useNavigate, Link } from "react-router-dom";

const MentorLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/mentors/mentorRegister/mentorLogin",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Save token to localStorage
      if (res.data.token) {
        localStorage.setItem("mentorToken", res.data.token);
        localStorage.setItem("mentorEmail", data.email);
      }

      toast.success("Mentor login successful");
      console.log("Login response:", res.data);

      // Navigate to mentor dashboard
      navigate("/mentor-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mentor-login-wrapper">
      <form className="mentor-login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Mentor Login</h2>
        <p className="subtitle">Welcome back! Continue your teaching journey</p>

        {/* Email Input */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="login-btn">
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Logging in...
            </>
          ) : (
            "Login as Mentor"
          )}
        </button>

        {/* Extra Links */}
        <div className="extra-links">
          <Link to="/mentor-register" className="signup-link">
            ← Back to Registration
          </Link>
          <span className="divider">•</span>
          <span className="forgot-password">Forgot password?</span>
        </div>

        {/* Footer Text */}
        <p className="footer-text">
          Don't have a mentor account?{" "}
          <Link to="/mentor-register" className="register-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default MentorLoginForm;
