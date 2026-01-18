export async function isUserAllowed(
  email: string | null | undefined,
): Promise<boolean> {
  if (!email) return false;

  // Retrieve comma-separated list from env
  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.toLowerCase());
}
