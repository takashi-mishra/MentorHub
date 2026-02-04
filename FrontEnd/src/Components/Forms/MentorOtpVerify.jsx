import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MentorOtpVerify.css";

const MentorOtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email || "";
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      if (!email) {
        toast.error("Email not found. Please register again.");
        navigate("/mentor-register");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/mentors/mentorRegister/verify-otp",
        {
          email,
          otp: data.otp,
        }
      );

      if (res.status === 200 || res.status === 201) {
        // Store token if provided in OTP verification response
        if (res.data.token) {
          localStorage.setItem("mentorToken", res.data.token);
          localStorage.setItem("mentorEmail", email);
        }
        toast.success("OTP verified successfully! You can now login.");
        navigate("/mentorloginform");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mentor-otp-wrapper">
      <form className="mentor-otp-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Verify Your Email</h2>
        <p className="subtitle">
          Enter the OTP sent to <b>{email || "your email"}</b>
        </p>

        <div className="form-group">
          <label>6-Digit OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            inputMode="numeric"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            className={errors.otp ? "input-error" : ""}
          />
          {errors.otp && <span className="error-message">{errors.otp.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="verify-btn">
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="otp-footer">
          <p>Didn't receive the OTP?</p>
          <button type="button" className="resend-btn">
            Resend OTP
          </button>
        </div>

        <div className="back-link">
          Want to go back? <a href="/mentor-register">Register Again</a>
        </div>
      </form>
    </div>
  );
};

export default MentorOtpVerify;
