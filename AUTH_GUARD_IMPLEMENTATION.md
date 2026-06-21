# Authentication Guard Implementation

## Overview
Added authentication protection to flights and transport results pages. Users must log in before accessing these pages, and the login accepts a test code "11111" for easy testing.

## Files Created

### 1. `components/auth/AuthGuard.tsx`
A reusable authentication guard component that:
- Checks if user is logged in using the existing auth system
- Redirects to login page if not authenticated
- Preserves the intended destination URL for redirect after login
- Shows loading spinner during auth check and redirect
- Wraps protected content and only renders when authenticated

## Files Modified

### 1. `app/login/page.tsx`
**Changes:**
- Added `useSearchParams` to read `returnUrl` query parameter
- Added `VALID_OTP` constant set to "11111"
- Added `otpError` state for validation feedback
- Modified `nextStep()` to validate OTP code at step 1
- Shows error message if wrong code is entered
- Displays hint text: "برای ورود، کد 11111 را وارد کنید"
- Redirects to `returnUrl` after successful login (defaults to `/profile`)
- Highlights OTP input fields in red when error occurs

### 2. `app/flights/page.tsx`
**Changes:**
- Imported `AuthGuard` component
- Wrapped entire page content with `<AuthGuard>` component
- Users must be logged in to view flight results

### 3. `app/bus/results/page.tsx`
**Changes:**
- Imported `AuthGuard` component
- Wrapped entire page content with `<AuthGuard>` component
- Users must be logged in to view bus results

### 4. `app/train/results/page.tsx`
**Changes:**
- Imported `AuthGuard` component
- Wrapped entire page content with `<AuthGuard>` component
- Users must be logged in to view train results

## How It Works

### Authentication Flow

1. **User tries to access protected page** (e.g., `/flights`)
   - AuthGuard checks authentication status
   - If not logged in, redirects to `/login?returnUrl=/flights`

2. **User enters phone number** (Step 1)
   - Any phone number is accepted
   - Clicks "دریافت کد تأیید"

3. **User enters OTP code** (Step 2)
   - Must enter exactly "11111"
   - Hint displayed: "برای ورود، کد 11111 را وارد کنید"
   - If wrong code: Shows error "کد وارد شده صحیح نیست. لطفاً 11111 را وارد کنید."
   - If correct: Proceeds to next step

4. **User completes profile** (Steps 3-4)
   - Enters name and last name
   - Completes registration

5. **Redirect after login**
   - User is redirected to original destination (returnUrl)
   - If no returnUrl, goes to `/profile`

### Protected Pages

The following pages now require authentication:
- ✅ `/flights` - Flight search results
- ✅ `/bus/results` - Bus search results
- ✅ `/train/results` - Train search results

### Testing the Authentication

**To test the login flow:**

1. Navigate to any protected page (e.g., `/flights`)
2. You'll be redirected to `/login?returnUrl=/flights`
3. Enter any phone number (e.g., 09123456789)
4. Click "دریافت کد تأیید"
5. Enter code: **11111** (one digit per box)
6. Click "تأیید"
7. Enter name and last name
8. Complete registration
9. You'll be redirected back to `/flights`

**To test wrong code:**
1. At step 2, enter any code other than 11111
2. Error message will appear in red
3. Input boxes will have red border
4. Enter 11111 to proceed

## Security Notes

⚠️ **Important:** The hardcoded OTP "11111" is for **development/testing only**. 

For production:
- Replace with actual SMS OTP service
- Implement proper OTP generation and validation
- Add rate limiting
- Add OTP expiration
- Implement resend functionality

## User Experience Features

### Loading States
- Shows "در حال بررسی احراز هویت..." while checking auth
- Shows "در حال انتقال به صفحه ورود..." while redirecting
- Smooth transitions between states

### Return URL Preservation
- Original destination is preserved in URL
- User returns to intended page after login
- Works across all protected pages

### Error Handling
- Clear error messages in Persian
- Visual feedback (red borders on inputs)
- Helpful hint text for test code

### Responsive Design
- Works on desktop and mobile
- Touch-friendly OTP input
- Proper keyboard types (numeric for OTP)

## Integration with Existing Auth System

The AuthGuard integrates seamlessly with the existing authentication system:
- Uses `useAuth()` hook from `@/hooks/useAuth`
- Checks `isLoggedIn` and `ready` states
- Respects existing session management
- Works with `AuthProvider` context

## Future Enhancements

Potential improvements:
- Add "Remember Me" functionality
- Implement social login options
- Add biometric authentication for mobile
- Implement session timeout warnings
- Add multi-factor authentication
- Create admin panel for user management