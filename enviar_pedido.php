<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura los datos del formulario y los sanitiza
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    // Configura el correo
    $destinatario = "pigutierrez@itba.edu.ar"; // Reemplaza con tu dirección de correo
    $asunto = "Nuevo pedido personalizado de $nombre";
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Mensaje:\n$mensaje";

    // Encabezados del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envía el correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "¡Pedido enviado exitosamente!";
    } else {
        echo "Hubo un error al enviar el pedido. Inténtalo de nuevo.";
    }
} else {
    echo "Método no permitido.";
}
?>
