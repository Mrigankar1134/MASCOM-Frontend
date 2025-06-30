// schemas/registerSchema.js
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string()
      .trim()
      .min(5, 'Name must be at least 5 characters long')
      .max(50, 'Name too long'),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email is required'
      })
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .refine((val) => val.endsWith('@iimamritsar.ac.in'), {
        message: 'Email must end with @iimamritsar.ac.in',
      }),

    phone: z
      .string()
      .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

    dateOfBirth: z
      .string()
      .nonempty('Date of Birth is required')
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date',
        path: ['dateOfBirth'],
      })
      .refine((val) => new Date(val) <= new Date(), {
        message: 'Date of Birth cannot be in the future',
        path: ['dateOfBirth'],
      }),

    gender: z.enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Please select a gender' }),
    }),

    userType: z.enum(['Student', 'Faculty', 'Staff'], {
      errorMap: () => ({ message: 'Please select a user type' }),
    }),

    rollNo: z.string().optional(),
    section: z.string().optional(),
    hostel: z.string().optional(),
    block: z.string().optional(),
    roomNo: z.string().optional(),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'Password must include uppercase, lowercase, number, and special character'
      ),

    confirmPassword: z
      .string()
      .min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .superRefine((data, ctx) => {
    if (data.userType === 'Student') {
      const issues = [];

      if (!data.rollNo?.trim()) {
        issues.push({ path: ['rollNo'], message: 'Roll Number is required for students' });
      }
      if (!data.section?.trim()) {
        issues.push({ path: ['section'], message: 'Section is required for students' });
      }
      if (!data.hostel?.trim()) {
        issues.push({ path: ['hostel'], message: 'Hostel is required for students' });
      }
      if (!data.block?.trim()) {
        issues.push({ path: ['block'], message: 'Block is required for students' });
      }
      if (!data.roomNo?.trim()) {
        issues.push({ path: ['roomNo'], message: 'Room Number is required for students' });
      }

      for (const issue of issues) {
        ctx.addIssue({
          path: issue.path,
          message: issue.message,
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });