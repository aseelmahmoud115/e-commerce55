import NextAuth from "next-auth";
import {authOption} from '@/next-auth/authOption'

const handler = NextAuth(authOption)
export {handler as GET , handler as POST}