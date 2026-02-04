# Mentor Registration Feature - Quick Reference

## 🚀 Quick Start

### Access Points
- **Direct Link:** `http://localhost:3173/mentor-register`
- **From User Registration:** Click "Want to teach? Sign up as Mentor"
- **From Student Login:** Click "Create account" → then "Sign up as Mentor"

---

## 📋 Form Fields

### Basic Information (Required)
```
Full Name           → text input
Email              → email validation
Password           → min 6 characters
Phone Number       → 10 digits only
Address            → text input
```

### Professional Details (Required)
```
Years of Experience → 0-70 range
Domain             → text input (e.g., Full Stack Web Development)
Skills             → comma-separated (converted to array)
About Yourself     → textarea, min 20 characters
```

### Document Upload (Optional)
```
Profile Thumbnail  → image files only (PNG, JPG, GIF)
Certificate        → PDF, PNG, JPG, GIF (max 10MB)
```

---

## 🔌 API Endpoint

```
POST http://localhost:3000/mentors/mentorRegister/register
Content-Type: multipart/form-data
```

### Response Format
```json
{
  "message": "Mentor registered successfully",
  "mentor": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "number": "...",
    "domain": "...",
    "skills": ["...", "..."],
    "role": "mentor",
    "isVerified": false
  }
}
```

---

## 🛠️ Key Technologies

| Technology | Purpose |
|-----------|---------|
| React Hook Form | Form validation |
| Axios | API requests |
| FormData API | File uploads |
| React Toastify | Notifications |
| React Router | Navigation |

---

## 🎨 Design Details

### Color Palette
- **Primary Gradient:** `#667eea` → `#764ba2`
- **Error Color:** `#dc3545`
- **Success Color:** `#28a745` (via Toast)
- **Border Color:** `#e0e0e0`

### Responsive Breakpoints
- **Desktop:** 700px form width
- **Tablet:** 768px and below → 100% width
- **Mobile:** 480px and below → optimized layout

---

## ✅ Validation Rules

| Field | Validation |
|-------|-----------|
| name | Required |
| email | Required, valid email pattern |
| password | Required, min 6 characters |
| number | Required, exactly 10 digits |
| address | Required |
| yearOfExperience | Required, number 0-70 |
| domain | Required |
| skills | Required, min 1 skill |
| aboutYourself | Required, min 20 characters |

---

## 🎯 File Structure

```
MentorForm.jsx         → Main component (280+ lines)
MentorForm.css         → Styling (500+ lines, fully responsive)
```

**Imported in:** App.jsx  
**Route:** `/mentor-register`

---

## 💻 Component Props

None! This is a standalone form component.

```jsx
<MentorForm /> // No props needed
```

---

## 🔄 Data Flow

```
Form Input
    ↓
Validation (React Hook Form)
    ↓
onSubmit Handler
    ↓
Create FormData Object
    ↓
Convert Skills to Array
    ↓
Axios POST Request
    ↓
Success → Toast + Navigate
Error → Toast + Display Error
```

---

## 📦 Skills Array Conversion

**Input:** `"React, Node.js, MongoDB"`  
**Process:**
```javascript
const skillsArray = data.skills
  .split(",")              // ["React", " Node.js", " MongoDB"]
  .map((skill) => skill.trim())  // ["React", "Node.js", "MongoDB"]
  .filter((skill) => skill !== "");  // Removes empty strings
```
**Sent as:** `JSON.stringify(skillsArray)` in FormData

---

## 🎬 Animations

| Animation | Use |
|-----------|-----|
| fadeInUp | Form and elements appear |
| fadeInDown | Header appears |
| float | Background elements |
| shake | Error messages |
| slideInUp | File selected indicator |
| spin | Loading spinner |

---

## 🧪 Testing Commands

### Check Form Validation
```javascript
// In browser console
document.querySelector('[placeholder="Enter your full name"]').value = "Test";
document.querySelector('[placeholder="Enter your email"]').value = "test@example.com";
// etc...
```

### Check API Endpoint
```bash
curl -X POST http://localhost:3000/mentors/mentorRegister/register
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Form not submitting | Check browser console for validation errors |
| API 404 error | Ensure backend server is running |
| File upload fails | Check backend multipart/form-data config |
| Toast not showing | Verify ToastContainer in App.jsx |
| Styling broken | Clear cache (Ctrl+Shift+R) and rebuild |

---

## 🔐 Security Notes

✅ **Frontend Validation:**
- Email format validation
- Password minimum length
- Phone number format
- File type checking

⚠️ **Backend Should Implement:**
- Password hashing (bcrypt)
- Email verification
- File size limits (server-side)
- Rate limiting
- SQL injection prevention
- CORS configuration

---

## 📱 Mobile Optimization

- **Single column layout** on mobile
- **Touch-friendly inputs** with larger padding
- **Optimized file upload** drag-and-drop areas
- **Readable font sizes** on all screens
- **Proper spacing** for thumb accessibility

---

## 🚀 Deployment Checklist

- [ ] Backend API endpoint deployed
- [ ] API URL updated in production
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Error logging setup
- [ ] Database backup configured
- [ ] Email service configured
- [ ] Frontend build optimized

---

## 📞 Support

For issues or questions:
1. Check the full documentation in `/FrontEnd/src/Components/Forms/README.md`
2. Review backend mentor registration controller
3. Check browser console for error messages
4. Verify API endpoint is accessible

---

**Status:** ✅ Production Ready  
**Last Updated:** January 21, 2026
