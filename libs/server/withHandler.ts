import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigProps {
  methods: method[];
  fn: (req: NextApiRequest, res: NextApiResponse) => void;
  isLogin?: boolean; //default: false
}

export default function withHandler({
  methods,
  fn,
  isLogin = true,
}: ConfigProps) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isLogin && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, error: '로그인을 진행해주세요.' });
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
