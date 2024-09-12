// pages/api/clerk-webhook.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { serverCreateUser } from "@/lib/user";

export async function POST(req: Request) {
  // Asegúrate de que WEBHOOK_SECRET está configurado en tu archivo .env o .env.local
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  console.log('Webhook active')

  // Obtener los headers necesarios para validar el webhook
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Si faltan headers importantes, devolver un error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    });
  }

  // Obtener el cuerpo de la solicitud
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Crear una instancia de Svix para validar el webhook
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verificar la validez de la firma del webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Invalid webhook signature", {
      status: 400,
    });
  }

  // Procesar el evento según su tipo
  const eventType = evt.type;
  console.log(`Received webhook event: ${eventType}`);

  if (eventType === "user.created") {
    const firstName = evt.data.first_name;
    const email = evt.data.email_addresses[0]?.email_address;
    const userClerkId = evt.data.id;

    if (!firstName || !email || !userClerkId) {
      return new Response("Error: Missing user data", {
        status: 400,
      });
    }

    try {
      // Llama a la función que creará el usuario en tu base de datos
      await serverCreateUser(firstName, email, userClerkId);
      console.log(`User created successfully with name: ${firstName}`);
      return new Response("User created successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error: Failed to create user", {
        status: 500,
      });
    }
  } else {
    // Si no es un evento que manejas, puedes devolver una respuesta 200 sin acción
    return new Response("Event not handled", {
      status: 200,
    });
  }
}
