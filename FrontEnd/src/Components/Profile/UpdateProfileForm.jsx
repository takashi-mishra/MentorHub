import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import "./UpdateProfileForm.css";

const UpdateProfileForm = ({ initialData, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      FullName: initialData.FullName,
      email: initialData.email,
      number: initialData.number || "",
      address: initialData.address || "",
    },
  });

  const { token } = useAuth();

  const onSubmitForm = async (data) => {
    try {
      await axios.put(
        "http://localhost:3000/users/userRegister/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      onSubmit(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Update Profile</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="update-form">
          <div className="form-group">
            <label htmlFor="FullName">Full Name *</label>
            <input
              id="FullName"
              type="text"
              placeholder="Enter your full name"
              {...register("FullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={errors.FullName ? "input-error" : ""}
            />
            {errors.FullName && (
              <span className="error-message">{errors.FullName.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
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
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="number">Mobile Number</label>
            <input
              id="number"
              type="tel"
              placeholder="Enter your mobile number"
              {...register("number", {
                pattern: {
                  value: /^[0-9]{10,}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className={errors.number ? "input-error" : ""}
            />
            {errors.number && (
              <span className="error-message">{errors.number.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              placeholder="Enter your address"
              rows="4"
              {...register("address")}
            />
          </div>

          <div className="form-actions">
            <motion.button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProfileForm;
