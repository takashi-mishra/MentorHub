import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./userForm.css";
import { useAuth } from "../../context/useAuth";

const UserForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("FullName", data.FullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("number", data.number);
      formData.append("address", data.address);
      formData.append("profileImage", data.profileImage[0]);
      formData.append("profileImageId", "123456");

      const res = await fetch(
        "http://localhost:3000/users/userRegister/user-Register",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      console.log(result);

      // Save OTP verification token returned by backend and navigate to OTP page
      const otpToken = result?.token || result?.data?.token || result?.accessToken || null;

      reset();
      toast.success("User registered successfully");
      // Pass the token to the OTP page (do not treat as logged-in yet)
      navigate("/otpverify", { state: { email: data.email, otpToken } });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Your Account</h2>

        <input
          placeholder="Full Name"
          {...register("FullName", { required: "Name is required" })}
        />
        {errors.FullName && <span>{errors.FullName.message}</span>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="tel"
          placeholder="Mobile Number"
          {...register("number", { required: "Mobile number is required" })}
        />
        {errors.number && <span>{errors.number.message}</span>}

        <input
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <span>{errors.address.message}</span>}

        <label className="file-label">
          Upload Profile Image
          <input
            type="file"
            accept="image/*"
            {...register("profileImage", { required: true })}
          />
        </label>
        {errors.profileImage && <span>Profile image is required</span>}

        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>

        <div className="login-link">
          Already have an account? <Link to="/userloginform">Login</Link>
        </div>

        <div className="mentor-signup-link">
          Want to teach? <Link to="/mentor-register">Sign up as Mentor</Link>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
