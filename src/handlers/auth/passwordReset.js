import { auth } from '../firebase.js';

export async function passwordReset(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const resetLink = await auth.generatePasswordResetLink(email);
    res.status(200).json({ message: 'Reset link generated', link: resetLink });
  } catch (error) {
    console.error('Error generating reset link:', error.message);
    res.status(500).json({ error: 'Failed to generate password reset link' });
  }
}
