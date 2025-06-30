import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const emailTo = import.meta.env.RESEND_EMAIL_TO

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async (formData) => {
      const dataEntries = Object.fromEntries(formData.entries());
      console.log('Form Data:', dataEntries);

      const { data, error } = await resend.emails.send({
        from: 'Obliq <obliq@resend.dev>',
        to: "albert.esc@gmail.com",
        subject: '📩 Nuevo contacto recibido',
        html: `
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;">
                <tr>
                    <td>
                        <h2 style="color: #333333;">📩 Nuevo contacto recibido</h2>
                        <p style="font-size: 16px; color: #555555;">Se ha recibido una nueva solicitud de contacto con los siguientes datos:</p>

                        <ul style="font-size: 16px; color: #333333; padding-left: 20px;">
                            <li><strong>Nombre:</strong> ${dataEntries.name}</li>
                            <li><strong>Email:</strong> ${dataEntries.email}</li>
                        </ul>

                        <p style="font-size: 16px; color: #333333;"><strong>Mensaje:</strong></p>
                        <p style="font-size: 16px; color: #555555; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">
                            ${dataEntries.message}
                        </p>

                        <p style="font-size: 14px; color: #999999;">Este mensaje ha sido generado automáticamente desde el formulario web.</p>
                    </td>
                </tr>
            </table>
        `,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
};