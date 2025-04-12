<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restablecer contraseña</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" bgcolor="#314F50" style="padding: 20px;">
                            <h1 style="color: white; font-size: 24px; margin: 0;">Movex</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px 30px;">
                            <h2 style="color: #111827; font-size: 20px; margin-bottom: 16px;">¡Hola!</h2>
                            <p style="color: #374151; font-size: 16px; margin: 0 0 20px;">
                                Has recibido este mensaje porque se solicitó un restablecimiento de contraseña para tu
                                cuenta.
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{{ $actionUrl }}"
                                    style="background-color: #314F50; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; display: inline-block;">
                                    Restablecer contraseña
                                </a>
                            </div>

                            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                                Este enlace de restablecimiento expirará en 60 minutos.<br><br>
                                Si no solicitaste el restablecimiento de contraseña, puedes ignorar este mensaje.
                            </p>

                            <p style="margin-top: 30px; color: #4b5563;">Saludos,<br><strong>Movex</strong></p>

                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

                            <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
                                Si estás teniendo problemas para hacer clic en el botón "Restablecer contraseña", copia
                                y pega la siguiente URL en tu navegador:
                            </p>
                            <p style="color: #2563eb; font-size: 12px; word-break: break-word;">
                                <a href="{{ $actionUrl }}" style="color: #2563eb;">{{ $actionUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#f9fafb" style="padding: 20px; color: #9ca3af; font-size: 12px;">
                            © 2025 Movex. Todos los derechos reservados.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>
