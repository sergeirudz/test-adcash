export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    overview: "/dashboard",
    campaigns: "/dashboard/campaigns",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
