import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const emailTo = import.meta.env.RESEND_EMAIL_TO

export async function POST({ request }: { request: Request }) {
  try {
    const { emailNewsletter } = await request.json();

    if (!emailNewsletter) {
      return new Response(
        JSON.stringify({ error: 'El email es obligatorio.' }),
        { status: 400 }
      );
    }

    // Enviar el correo con Resend
    const emailData = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: emailTo,
      subject: `📩 Nuevo registro de newsletter`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;">
            <tr>
                <td>
                    <h2 style="color: #333333;">📩 Nuevo registro de newsletter</h2>
                    <p style="font-size: 16px; color: #555555;">Se ha recibido una nueva solicitud de registro de newsletter con los siguientes datos:</p>

                    <ul style="font-size: 16px; color: #333333; padding-left: 20px;">
                        <li><strong>Email:</strong> ${emailNewsletter}</li>
                    </ul>

                    <p style="font-size: 14px; color: #999999;">Este mensaje ha sido generado automáticamente desde el formulario web.</p>
                </td>
            </tr>
        </table>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, data: emailData }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(
      JSON.stringify({ error: 'Error inesperado al enviar el correo.' }),
      { status: 500 }
    );
  }
}
