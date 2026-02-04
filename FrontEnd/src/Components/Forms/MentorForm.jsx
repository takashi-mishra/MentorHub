import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./MentorForm.css";

const MentorForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const profileThumbnailFile = watch("profileThumbnail");
  const certificateFile = watch("certificate");

  const onSubmit = async (data) => {
    try {
      // Create FormData object for multipart/form-data
      const formData = new FormData();

      // Basic Details
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("number", data.number);
      formData.append("address", data.address);

      // Professional Details
      formData.append("yearOfExperience", data.yearOfExperience);
      formData.append("domain", data.domain);

      // Convert skills to array
      const skillsArray = data.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
      formData.append("skills", JSON.stringify(skillsArray));

      formData.append("aboutYourself", data.aboutYourself);

      // File uploads (optional)
      if (data.profileThumbnail && data.profileThumbnail[0]) {
        formData.append("profileThumbnail", data.profileThumbnail[0]);
      }

      if (data.certificate && data.certificate[0]) {
        formData.append("certificate", data.certificate[0]);
      }

      // Send request using Axios
      const res = await axios.post(
        "http://localhost:3000/mentors/mentorRegister/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        reset();
        // Store token and email if provided in response
        if (res.data.token) {
          localStorage.setItem("mentorToken", res.data.token);
        }
        localStorage.setItem("mentorEmail", data.email);
        toast.success("Mentor registered successfully! Please verify your OTP.");
        // Redirect to OTP verification for mentors
        navigate("/mentor-otpverify", { state: { email: data.email } });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mentor-register-wrapper">
      <form className="mentor-register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Become a Mentor</h2>
        <p className="form-subtitle">Share your expertise with students</p>

        {/* ============================================================================
            SECTION 1: BASIC DETAILS
            ============================================================================ */}
        <div className="form-section">
          <h3 className="section-title">📋 Basic Information</h3>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Your contact number"
                {...register("number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className={errors.number ? "input-error" : ""}
              />
              {errors.number && <span className="error-message">{errors.number.message}</span>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Your address"
                {...register("address", { required: "Address is required" })}
                className={errors.address ? "input-error" : ""}
              />
              {errors.address && <span className="error-message">{errors.address.message}</span>}
            </div>
          </div>
        </div>

        {/* ============================================================================
            SECTION 2: PROFESSIONAL DETAILS
            ============================================================================ */}
        <div className="form-section">
          <h3 className="section-title">💼 Professional Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                placeholder="e.g., 5"
                min="0"
                max="70"
                {...register("yearOfExperience", {
                  required: "Years of experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                  max: {
                    value: 70,
                    message: "Please enter a valid experience value",
                  },
                })}
                className={errors.yearOfExperience ? "input-error" : ""}
              />
              {errors.yearOfExperience && (
                <span className="error-message">{errors.yearOfExperience.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Domain/Specialization</label>
              <input
                type="text"
                placeholder="e.g., Full Stack Web Development"
                {...register("domain", {
                  required: "Domain is required",
                })}
                className={errors.domain ? "input-error" : ""}
              />
              {errors.domain && <span className="error-message">{errors.domain.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <textarea
              placeholder="e.g., React, Node.js, MongoDB, JavaScript"
              rows="3"
              {...register("skills", {
                required: "At least one skill is required",
              })}
              className={errors.skills ? "input-error" : ""}
            ></textarea>
            {errors.skills && <span className="error-message">{errors.skills.message}</span>}
            <small className="help-text">Separate skills with commas</small>
          </div>

          <div className="form-group">
            <label>About Yourself</label>
            <textarea
              placeholder="Tell us about your experience and teaching approach..."
              rows="4"
              {...register("aboutYourself", {
                required: "Please tell us about yourself",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
              className={errors.aboutYourself ? "input-error" : ""}
            ></textarea>
            {errors.aboutYourself && (
              <span className="error-message">{errors.aboutYourself.message}</span>
            )}
          </div>
        </div>

        {/* ============================================================================
            SECTION 3: FILE UPLOADS
            ============================================================================ */}
        <div className="form-section">
          <h3 className="section-title">🖼️ Upload Documents</h3>

          <div className="form-group">
            <label>Profile Thumbnail</label>
            <div className="file-upload-wrapper">
              <label className="file-input-label">
                <div className="file-input-content">
                  <span className="file-icon">📸</span>
                  <span className="file-text">Click to upload profile image</span>
                  <small>PNG, JPG, GIF (max 5MB)</small>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profileThumbnail")}
                  className="file-input-hidden"
                />
              </label>
              {profileThumbnailFile && profileThumbnailFile[0] && (
                <div className="file-selected">
                  ✓ {profileThumbnailFile[0].name}
                </div>
              )}
            </div>
            {errors.profileThumbnail && (
              <span className="error-message">{errors.profileThumbnail.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Certificate / Qualification</label>
            <div className="file-upload-wrapper">
              <label className="file-input-label">
                <div className="file-input-content">
                  <span className="file-icon">📄</span>
                  <span className="file-text">Click to upload certificate</span>
                  <small>PDF, PNG, JPG (max 10MB)</small>
                </div>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif"
                  {...register("certificate")}
                  className="file-input-hidden"
                />
              </label>
              {certificateFile && certificateFile[0] && (
                <div className="file-selected">
                  ✓ {certificateFile[0].name}
                </div>
              )}
            </div>
            {errors.certificate && (
              <span className="error-message">{errors.certificate.message}</span>
            )}
          </div>
        </div>

        {/* ============================================================================
            SUBMIT BUTTON & NAVIGATION
            ============================================================================ */}
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Registering...
            </>
          ) : (
            "Register as Mentor"
          )}
        </button>

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <Link to="/mentorloginform" className="footer-link">
              Login
            </Link>
          </p>
          <p>
            Want to register as a student instead?{" "}
            <Link to="/userSignUp" className="footer-link">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default MentorForm;
