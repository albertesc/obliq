import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const emailTo = import.meta.env.RESEND_EMAIL_TO

export async function POST({ request }: { request: Request }) {
  try {
    const { name, email, company, message, legal, subscribe } = await request.json();

    // Validación básica
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'El email es obligatorio.' }),
        { status: 400 }
      );
    }

    // Enviar el correo con Resend
    const emailData = await resend.emails.send({
      from: '<Oblic> info@obliqproductions.com',
      to: emailTo,
      subject: `📩 Nuevo contacto recibido`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;">
            <tr>
                <td>
                    <h2 style="color: #333333;">📩 Nuevo contacto recibido</h2>
                    <p style="font-size: 16px; color: #555555;">Se ha recibido una nueva solicitud de contacto con los siguientes datos:</p>

                    <ul style="font-size: 16px; color: #333333; padding-left: 20px;">
                        <li><strong>Nombre:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Teléfono:</strong> ${company}</li>
                        <li><strong>Terminos legales:</strong> ${legal ? 'aceptados' : 'no aceptados'}</li>
                        <li><strong>Suscripción:</strong> ${subscribe ? 'Sí' : 'No'}</li>
                    </ul>

                    <p style="font-size: 16px; color: #333333;"><strong>Mensaje:</strong></p>
                    <p style="font-size: 16px; color: #555555; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">
                        ${message}
                    </p>

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
