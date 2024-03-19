
import NextAuth from 'next-auth';
import authOptions from '../../../../app/modules/config/auth/authOptions';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
