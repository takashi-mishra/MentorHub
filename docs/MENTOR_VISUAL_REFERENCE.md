# Mentor Registration - Visual & Code Reference Guide

## 🎨 Visual Form Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ✨ Become a Mentor ✨                     │
│         Share your expertise with students             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📋 BASIC INFORMATION                                  │
│  ┌──────────────────┬──────────────────┐               │
│  │ Full Name        │ Email Address    │               │
│  ├──────────────────┼──────────────────┤               │
│  │ Password         │ Phone Number     │               │
│  ├──────────────────┴──────────────────┤               │
│  │ Address                             │               │
│  └─────────────────────────────────────┘               │
│                                                         │
│  💼 PROFESSIONAL INFORMATION                           │
│  ┌──────────────────┬──────────────────┐               │
│  │ Years of Exp     │ Domain           │               │
│  └──────────────────┴──────────────────┘               │
│  ┌─────────────────────────────────────┐               │
│  │ Skills (comma-separated)            │               │
│  ├─────────────────────────────────────┤               │
│  │ About Yourself (textarea)           │               │
│  │                                     │               │
│  └─────────────────────────────────────┘               │
│                                                         │
│  🖼️ UPLOAD DOCUMENTS                                  │
│  ┌─────────────────────────────────────┐               │
│  │ 📸 Profile Thumbnail (optional)     │               │
│  │ ┌─────────────────────────────────┐ │               │
│  │ │  Click to upload profile image  │ │               │
│  │ │  PNG, JPG, GIF (max 5MB)        │ │               │
│  │ └─────────────────────────────────┘ │               │
│  └─────────────────────────────────────┘               │
│  ┌─────────────────────────────────────┐               │
│  │ 📄 Certificate/Qualification        │               │
│  │ ┌─────────────────────────────────┐ │               │
│  │ │  Click to upload certificate    │ │               │
│  │ │  PDF, PNG, JPG, GIF (max 10MB)  │ │               │
│  │ └─────────────────────────────────┘ │               │
│  └─────────────────────────────────────┘               │
│                                                         │
│              ┌─────────────────────┐                   │
│              │ Register as Mentor  │                   │
│              └─────────────────────┘                   │
│                                                         │
│  Already have an account? Login                        │
│  Want to register as a student? Sign up here           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Code Structure

### MentorForm.jsx - Component Structure

```jsx
const MentorForm = () => {
  // Hooks
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } = useForm();
  
  // Watch file inputs for display
  const profileThumbnailFile = watch("profileThumbnail");
  const certificateFile = watch("certificate");
  
  // Form submission handler
  const onSubmit = async (data) => {
    // 1. Create FormData
    // 2. Append all form fields
    // 3. Convert skills to array
    // 4. Append optional files
    // 5. Make Axios POST request
    // 6. Handle success/error
  };
  
  // Render form with 3 sections
  return (
    <div className="mentor-register-wrapper">
      <form className="mentor-register-form">
        <h2>Become a Mentor</h2>
        
        {/* Section 1: Basic Info */}
        {/* Section 2: Professional Details */}
        {/* Section 3: File Uploads */}
        
        <button>Register as Mentor</button>
        
        <div className="form-footer">
          {/* Navigation links */}
        </div>
      </form>
    </div>
  );
};
```

---

## 📝 Form Submission Flow

```javascript
┌─────────────────────────┐
│   Form Data Object      │
│  {                      │
│    name: "John Doe"     │
│    email: "john@..."    │
│    password: "***"      │
│    number: "9876543210" │
│    address: "123 St"    │
│    yearOfExperience: 5  │
│    domain: "Web Dev"    │
│    skills: "React,Node" │ ─┐
│    aboutYourself: "..." │  │
│    profileThumbnail: FileList │
│    certificate: FileList     │
│  }                      │
└─────────────────────────┘
        │
        ↓ (In onSubmit handler)
┌─────────────────────────┐
│   Create FormData()     │
│   Append all fields     │
│   Convert skills array  │
└─────────────────────────┘
        │
        ↓
┌─────────────────────────┐
│  Axios POST Request     │
│  /mentors/mentor       │
│  Register/register     │
│  multipart/form-data   │
└─────────────────────────┘
        │
        ├─→ Success ──→ Toast notification
        │              Navigate to login
        │              Reset form
        │
        └─→ Error ────→ Toast error message
                       Keep form data
                       Show error message
```

---

## 🎨 Styling Hierarchy

```
MentorForm.css
│
├── .mentor-register-wrapper (Container)
│   │
│   └── .mentor-register-form (Form)
│       │
│       ├── h2 (Title)
│       ├── .form-subtitle (Subtitle)
│       │
│       ├── .form-section (Each section)
│       │   ├── .section-title
│       │   │
│       │   ├── .form-group
│       │   │   ├── label
│       │   │   ├── input / textarea
│       │   │   └── .error-message
│       │   │
│       │   └── .form-row (2-column)
│       │       └── .form-group (multiple)
│       │
│       ├── .submit-btn
│       │   └── .spinner (while loading)
│       │
│       └── .form-footer
│           ├── p
│           └── .footer-link
│
└── Animations & Media Queries
    ├── @keyframes
    ├── @media (tablet)
    └── @media (mobile)
```

---

## 🔧 Key Helper Functions

### Skills Array Conversion

```javascript
// Input: "React, Node.js, MongoDB"
const skillsArray = data.skills
  .split(",")                           // ["React", " Node.js", " MongoDB"]
  .map((skill) => skill.trim())         // ["React", "Node.js", "MongoDB"]
  .filter((skill) => skill !== "");     // Remove empty strings

// Output: ["React", "Node.js", "MongoDB"]
// Send as: JSON.stringify(skillsArray)
```

### File Upload Handler

```javascript
// Check if file exists
if (data.profileThumbnail && data.profileThumbnail[0]) {
  formData.append("profileThumbnail", data.profileThumbnail[0]);
}

// If not provided, backend stores null
// No need to send anything if file not selected
```

### Error Handling

```javascript
try {
  const res = await axios.post(url, formData, config);
  
  if (res.status === 200 || res.status === 201) {
    toast.success("Mentor registered successfully!");
    navigate("/mentorloginform");
  }
} catch (error) {
  const errorMsg = error.response?.data?.message || "Registration failed";
  toast.error(errorMsg);
}
```

---

## 📊 Form Field Reference Table

| Field | Type | Validation | Error Message |
|-------|------|-----------|---|
| name | text | required | Full name is required |
| email | email | required, pattern | Invalid email address |
| password | password | required, min:6 | Password must be at least 6 characters |
| number | tel | required, pattern:10 | Phone number must be 10 digits |
| address | text | required | Address is required |
| yearOfExperience | number | required, min:0, max:70 | Please enter a valid experience value |
| domain | text | required | Domain is required |
| skills | textarea | required, split | At least one skill is required |
| aboutYourself | textarea | required, min:20 | Description must be at least 20 characters |
| profileThumbnail | file | optional | - |
| certificate | file | optional | - |

---

## 🎬 Animation Keyframes

### fadeInUp
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Duration: 600ms, Staggered delays for each element */
```

### float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}
/* Duration: 12s infinite, for background elements */
```

### shake
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
/* Duration: 300ms, for error messages */
```

### spin
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
/* Duration: 800ms infinite, for loading spinner */
```

---

## 🔗 Route Configuration

### App.jsx Router Setup

```jsx
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Home />} />
  <Route path="/userform" element={<UserForm />} />
  <Route path="/userSignUp" element={<UserForm />} />
  <Route path="/userloginform" element={<UserLoginForm />} />
  <Route path="/otpverify" element={<OtpVerify />} />
  
  {/* NEW: Mentor Registration */}
  <Route path="/mentor-register" element={<MentorForm />} />
  
  {/* Protected routes */}
  <Route element={<PrivateRoute />}>
    <Route path="/Dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>
```

---

## 🔄 Navigation Links

### From User Registration Page
```jsx
<div className="mentor-signup-link">
  Want to teach? <Link to="/mentor-register">Sign up as Mentor</Link>
</div>
```

### From Mentor Form (Footer)
```jsx
<div className="form-footer">
  <p>
    Already have an account?{" "}
    <Link to="/userloginform" className="footer-link">Login</Link>
  </p>
  <p>
    Want to register as a student?{" "}
    <Link to="/userSignUp" className="footer-link">Sign up here</Link>
  </p>
</div>
```

---

## 📱 Responsive CSS Variables

### Desktop (1024px+)
```css
max-width: 700px;
padding: 50px;
grid-template-columns: 1fr 1fr; /* 2-column */
```

### Tablet (768-1023px)
```css
max-width: 100%;
padding: 32px 24px;
grid-template-columns: 1fr 1fr; /* 2-column if space */
```

### Mobile (320-767px)
```css
max-width: 100%;
padding: 24px 16px;
grid-template-columns: 1fr; /* 1-column */
font-size: 13px-14px; /* Reduced */
```

---

## 🎯 Accessibility Features

### Focus States
```css
input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}
```

### Focus-Visible (Keyboard)
```css
input:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

### ARIA Support (Ready for labels)
```jsx
<label htmlFor="name">Full Name</label>
<input id="name" type="text" />
```

---

## 💡 Best Practices Implemented

✅ **React Best Practices**
- Functional components
- Hooks (useForm, useNavigate, useWatch)
- Proper dependency management
- Error boundaries ready

✅ **Form Best Practices**
- Field-level validation
- Inline error messages
- Form reset after success
- Loading states
- Disabled submission during request

✅ **CSS Best Practices**
- BEM naming convention
- CSS variables for consistency
- Mobile-first responsive design
- Semantic class names
- Proper animation performance

✅ **Security Best Practices**
- Client-side validation
- FormData for file uploads
- Proper error handling
- No sensitive data in console

✅ **UX Best Practices**
- Clear visual hierarchy
- Ample whitespace
- Readable font sizes
- Clear button states
- Smooth transitions
- Progress indication

---

## 🚀 Quick Integration Checklist

- [x] MentorForm.jsx created and configured
- [x] MentorForm.css created with animations
- [x] App.jsx updated with route
- [x] userForm.jsx updated with link
- [x] userForm.css updated with link styles
- [x] React Hook Form validation setup
- [x] Axios API integration configured
- [x] Toast notifications configured
- [x] File upload handling implemented
- [x] Skills array conversion implemented
- [x] Responsive design implemented
- [x] Error handling implemented
- [x] Documentation completed

---

## 📞 Quick Reference

### To Add More Fields
```jsx
// In MentorForm.jsx
<input {...register("fieldName", { required: "Error message" })} />
{errors.fieldName && <span>{errors.fieldName.message}</span>}

// In MentorForm.css
.form-group input { /* styles */ }
```

### To Change Colors
```css
/* In MentorForm.css */
--primary-color: #667eea;
--secondary-color: #764ba2;
--error-color: #dc3545;
```

### To Change API Endpoint
```jsx
// In MentorForm.jsx
const API_URL = "http://your-new-endpoint.com/mentors/mentorRegister/register";
```

### To Add More Animations
```css
/* In MentorForm.css */
@keyframes yourAnimation {
  from { /* styles */ }
  to { /* styles */ }
}
```

---

**Ready to Deploy! 🚀**
