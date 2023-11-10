import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../libs/server/client';
import withHandler, { ResponseType } from '../../../../libs/server/withHandler';
import { withApiSession } from '../../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;
  const exist = await client.token.findUnique({
    where: {
      token: token,
    },
  });
  if (!exist) {
    return res.status(404).end();
  }
  req.session.user = {
    id: exist.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: exist.userId,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler('POST', handler));
