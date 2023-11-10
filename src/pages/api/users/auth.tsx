import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../libs/server/client';
import withHandler, { ResponseType } from '../../../../libs/server/withHandler';
import Twilio from 'twilio';
import smtpTransport from '../../../../libs/server/email';

const twilio = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const randomNum = String(Math.random()).substring(2, 8);
  const token = await client.token.create({
    data: {
      token: randomNum,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: '유저',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // await twilio.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `인증 코드 : ${randomNum}`,
    //   from: process.env.FROM_PHONE,
    // });
  }
  if (email) {
    // const mailOptions = {
    //   from: process.env.MAIL_ID,
    //   to: email,
    //   subject: 'MARKET 인증 메일',
    //   text: `인증 코드 : ${randomNum}`,
    // };
    // const result = await smtpTransport.sendMail(
    //   mailOptions,
    //   (error, responses) => {
    //     if (error) {
    //       console.log(error);
    //       return null;
    //     } else {
    //       console.log(responses);
    //       return null;
    //     }
    //   }
    // );
    // smtpTransport.close();
    // console.log(result);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler({ method: 'POST', fn: handler, isLogin: false });
