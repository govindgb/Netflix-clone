import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb'
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";

// The @next-auth/prisma-adapter package is used to integrate NextAuth.js (a popular authentication library for Next.js) with Prisma (an ORM for working with databases). It acts as a bridge between NextAuth.js and your Prisma database, allowing you to store user data, sessions, accounts, and verification tokens directly in your database using Prisma.
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export default NextAuth({
    providers :[
        GithubProvider({
           clientId: process.env.GITHUB_ID || '',
           clientSecret:process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || '',
         }),
        Credentials({
            id:'Credentials',
            name:'Credentials',
            credentials : {
            email :{
                label:'Email',
                type:'text',
            },
            password :{
                label : 'Password',
                type : 'password'
            }
          },
          async authorize(credentials){
            // console.log("coming",credentials);
            if(!credentials?.email || !credentials?.password){
                throw new Error('Email and password required');
            }
            
            const user = await prismadb.user.findUnique({
                where :{
                    email : credentials.email
                }
            });

            if(!user || !user.hashedPassword){
                throw new Error('Email is not exist');
            }

            const isCorrectPassword = await compare(
                credentials.password,
                user.hashedPassword
            )

            if(!isCorrectPassword){
                throw new Error('Incorrect password');
            }

            return user;
            // return "working";
          }
        })
    ],
    pages :{
        signIn : '/auth',
        error: '/auth/error', // Error handling page
    },
    debug : process.env.NODE_ENV === 'development',
    adapter : PrismaAdapter(prismadb),
    session :{
        strategy : 'jwt',
    },
    jwt : {
        secret : process.env.NEXTAUTH_JWT_SECRET,
    },
    secret : process.env.NEXTAUTH_SECRET,
})