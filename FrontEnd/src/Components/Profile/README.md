# User Profile Page Documentation

## 📋 Overview

A modern, fully-featured User Profile Page with glassmorphism design, smooth animations, and complete CRUD functionality for user profiles.

## 🎯 Features

### ✨ Core Features
- **Profile Display**: Shows user information with beautiful glassmorphism card design
- **Profile Image**: Circular avatar with verified badge and fallback icon
- **Account Details**: Displays all user information in a grid layout
- **Skeleton Loader**: Animated loading state while fetching data
- **Mobile Responsive**: Perfect rendering on all device sizes
- **Smooth Animations**: Powered by Framer Motion

### 🔧 Functionality
- **Update Profile**: Edit user information with React Hook Form validation
- **Delete Account**: Confirmation modal with account deletion functionality
- **Real-time Notifications**: Toast notifications for success/error messages
- **Protected Route**: Only authenticated users can access the profile page

## 📁 File Structure

```
FrontEnd/
├── src/
│   ├── Pages/
│   │   ├── Profile.jsx              # Main profile page
│   │   └── Profile.css              # Profile page styles
│   │
│   ├── Components/
│   │   └── Profile/
│   │       ├── UpdateProfileForm.jsx    # Update form component
│   │       ├── UpdateProfileForm.css    # Form styles
│   │       ├── DeleteConfirmationModal.jsx # Delete modal
│   │       ├── DeleteConfirmationModal.css # Modal styles
│   │       ├── ProfileSkeleton.jsx    # Skeleton loader
│   │       └── ProfileSkeleton.css    # Skeleton styles
│   │
│   ├── App.jsx                      # Updated with /profile route
│   └── ...
│
└── public/
    └── default-profile-icon.svg    # Fallback profile image
```

## 🚀 Getting Started

### Installation
All required dependencies are already installed:
```bash
npm install axios framer-motion react-toastify
```

### Usage

The Profile page is automatically integrated into your application. Users can access it by:

1. **Via Navbar**: Click on their avatar → Select "Profile"
2. **Direct URL**: Navigate to `/profile`

> ⚠️ **Note**: The profile page is protected - users must be logged in to access it.

## 🔌 API Integration

### 1. Fetch User Profile
**Endpoint**: `GET http://localhost:3000/users/userRegister/user-Profile`

**Headers**: 
```javascript
{
  Authorization: `Bearer ${token}`
}
```

**Response**:
```json
{
  "user": {
    "id": "123",
    "FullName": "John Doe",
    "email": "john@example.com",
    "number": "9876543210",
    "address": "123 Main St",
    "profileImage": "image-url",
    "isVerified": true
  }
}
```

### 2. Update Profile
**Endpoint**: `PUT http://localhost:3000/users/userRegister/update-profile`

**Headers**:
```javascript
{
  Authorization: `Bearer ${token}`
}
```

**Request Body**:
```json
{
  "FullName": "John Updated",
  "email": "john.updated@example.com",
  "number": "9876543210",
  "address": "Updated Address"
}
```

**Response**:
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

### 3. Delete Account
**Endpoint**: `DELETE http://localhost:3000/users/userRegister/delete-account`

**Headers**:
```javascript
{
  Authorization: `Bearer ${token}`
}
```

**Response**:
```json
{
  "message": "Account deleted successfully"
}
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #6366f1 (Indigo)
- **Danger**: #ef4444 (Red)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: 700 font-weight with proper hierarchy
- **Body**: 400-600 font-weight for readability

### Animations
- **Page Load**: Smooth fade-in with stagger effect
- **Hover Effects**: Scale and shadow transitions
- **Modal Animations**: Scale + fade entrance/exit
- **Skeleton Loader**: Shimmer animation
- **Button Click**: Scale feedback (0.95x)

## 📱 Responsive Breakpoints

| Breakpoint | Device | Behavior |
|-----------|--------|----------|
| ≥ 768px | Tablet/Desktop | Full grid layout, side-by-side header |
| 480px - 768px | Tablet | Single column grid, adjusted spacing |
| < 480px | Mobile | Full-width, stacked layout, bottom sheet modals |

## 🔐 Security Features

- **Protected Route**: Only authenticated users can access
- **Token Authorization**: All API calls include Bearer token
- **Confirmation Modal**: Prevents accidental account deletion
- **Input Validation**: Client-side validation with React Hook Form
- **Error Handling**: Comprehensive error messages and logging

## 🛠️ Component API

### Profile Component
```jsx
import Profile from "./Pages/Profile";

// Used in App.jsx within a PrivateRoute
<Route element={<PrivateRoute />}>
  <Route path="/profile" element={<Profile />} />
</Route>
```

**Props**: None (uses useAuth context)

**State Management**:
- `profileData`: User profile object
- `loading`: Boolean for loading state
- `isEditModalOpen`: Edit form visibility
- `isDeleteModalOpen`: Delete modal visibility
- `isDeleting`: Deletion in progress flag

### UpdateProfileForm Component
```jsx
<UpdateProfileForm
  initialData={profileData}
  onSubmit={handleProfileUpdate}
  onClose={() => setIsEditModalOpen(false)}
/>
```

**Props**:
- `initialData`: Object with existing user data
- `onSubmit`: Callback function on successful update
- `onClose`: Callback function to close the modal

**Validation Rules**:
- **FullName**: Required, min 3 characters
- **Email**: Required, valid email format
- **Number**: Optional, must be 10+ digits if provided
- **Address**: Optional, no length restrictions

### DeleteConfirmationModal Component
```jsx
<DeleteConfirmationModal
  onConfirm={handleDeleteAccount}
  onCancel={() => setIsDeleteModalOpen(false)}
  isDeleting={isDeleting}
/>
```

**Props**:
- `onConfirm`: Callback when delete is confirmed
- `onCancel`: Callback when action is cancelled
- `isDeleting`: Boolean showing deletion state

### ProfileSkeleton Component
```jsx
import ProfileSkeleton from "./Components/Profile/ProfileSkeleton";

// Automatically shown while loading
{loading ? <ProfileSkeleton /> : <Profile />}
```

## 🐛 Troubleshooting

### Profile data not loading?
1. Check if user is authenticated (token exists)
2. Verify API endpoint is running on `localhost:3000`
3. Check browser console for error messages
4. Ensure Bearer token is valid

### Update failing?
1. Verify all required fields are filled
2. Check email format is valid
3. Ensure phone number has 10+ digits
4. Check API server logs for validation errors

### Delete not working?
1. Ensure user is not in demo mode
2. Verify API endpoint is accessible
3. Check if user has permission to delete account
4. Verify token hasn't expired

## 📚 Dependencies

- **react**: ^19.2.0 - UI library
- **react-router-dom**: ^7.11.0 - Routing
- **axios**: ^1.x - API calls
- **react-hook-form**: ^7.69.0 - Form validation
- **framer-motion**: ^11.x - Animations
- **react-toastify**: ^10.x - Toast notifications

## 🎬 Example Usage Flow

1. **User navigates to profile**
   ```
   Click Avatar → Profile Menu → Select "Profile"
   ↓
   User redirected to /profile
   ```

2. **Profile page loads**
   ```
   → Skeleton loader shown
   → API fetches user data
   → Profile displays with animations
   ```

3. **User updates profile**
   ```
   → Click "Update Profile" button
   → Form modal opens with pre-filled data
   → Edit desired fields
   → Click "Update Profile"
   → Success toast shown
   → Modal closes
   → Profile refreshed with new data
   ```

4. **User deletes account**
   ```
   → Click "Delete Account" button
   → Confirmation modal shown
   → Click "Delete Permanently"
   → Account deleted
   → User redirected to home
   → Success toast shown
   ```

## 🌐 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 📝 Best Practices

1. **Always verify API responses** before displaying data
2. **Handle network errors gracefully** with user-friendly messages
3. **Validate form data** on both client and server side
4. **Use loading states** to prevent duplicate submissions
5. **Implement proper error boundaries** for component failures
6. **Test on multiple devices** before deployment

## 🚀 Performance Optimization

- **Lazy loading**: Components load on demand
- **Memoization**: Prevents unnecessary re-renders
- **CSS animations**: Hardware-accelerated for smooth 60fps
- **Image optimization**: Use appropriately sized images
- **Debounced API calls**: Prevents excessive server requests

## 📧 Support & Issues

For any issues or questions:
1. Check browser console for error messages
2. Verify API endpoint configuration
3. Ensure all dependencies are installed
4. Check network tab in DevTools for failed requests

## ✅ Checklist for Deployment

- [ ] API endpoints verified and working
- [ ] All environment variables configured
- [ ] Profile images properly hosted/stored
- [ ] Error handling implemented
- [ ] Mobile responsiveness tested
- [ ] Animations smooth at 60fps
- [ ] Toast notifications working
- [ ] Protected routes configured
- [ ] Form validation working
- [ ] Delete confirmation working
