import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  password: process.env.COOKIE_PASSWORD!,
  cookieName: 'market_session',
  // cookieOptions: {
  //   secure: process.env.NODE_ENV === 'production',
  // },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
