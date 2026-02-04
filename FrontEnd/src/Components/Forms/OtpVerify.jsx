import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./OtpVerify.css";

const OtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const email = location?.state?.email || "";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prefer token passed in navigation state (registration token), otherwise fallback to current auth token
      const otpToken = location?.state?.otpToken || localStorage.getItem("token");

      if (!otpToken) {
        toast.error("Verification token missing. Please register again or request a new OTP.");
        return;
      }

      const headers = { "Content-Type": "application/json" };

      const res = await fetch(
        "http://localhost:3000/users/userRegister/verify-OTP",
        {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({
            email,
            otp: data.otp,
            token: otpToken,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Invalid OTP");
        return;
      }

      // On success backend returns an auth token. Use it to log the user in.
      const authToken = result?.token || result?.data?.token || null;
      if (authToken) {
        // call context login to store token and fetch profile
        // import useAuth at top
        await login(authToken);
      }

      toast.success("OTP verified successfully");
      console.log(result);

      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="otp-wrapper">
      <form className="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Verify OTP</h2>
        <p className="subtitle">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          {...register("otp", {
            required: "OTP is required",
            minLength: 6,
            maxLength: 6,
          })}
        />
        {errors.otp && <span>Enter valid 6-digit OTP</span>}

        <button disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="resend">Didn’t receive OTP? <span>Resend</span></p>
      </form>
    </div>
  );
};

export default OtpVerify;
