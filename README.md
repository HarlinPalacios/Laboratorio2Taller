# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointments/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```

### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/users/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/users/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/users/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/api/users/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/users/:uid/password`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pets/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pets/:pid`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `DELETE`

- **Actualizar Información de la Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

## Funcionalidades Adicionales

Las siguientes funcionalidades necesitan ser desarrolladas:

1. **Actualizar Foto del Usuario**
   - Descripción: Implementar funcionalidad para actualizar la foto de perfil del usuario.

      `A travez de este controlador se podra actualizar la foto del usuario la cual se asigno cuando se registro, ya actualizada la foto se eliminara la foto de la base de datos y se colocara la nueva imagen.`

      **URL:** 
      `v1/user/updateProfilePicture/:uid`

      **METODO:** 
      `patch`

      **CUERPO:**
      `profilePicture  y la imagen a actualizar`

2. **Listar Citas**
   - Descripción: Implementar funcionalidad para listar todas las citas de un usuario.

      `A travez de este metodo se podra listar las citas que se generaron.`

      **URL:** 
      `/v1/appointment/`

      **METODO:**
      `get`

      **CUERPO:**
  

3. **Actualizar Cita**
   - Descripción: Implementar funcionalidad para actualizar una cita existente.

    `A travez de este metodos se podra actualizar la cita, se podra remplazar la fecha estimada a la cual estaba la ciat de la mascota, mandando a llamar el id de la cita e introduciendo los datos para poder actualizar la cita, ingresando la fecha a la cual se requiere reagendar y los ide de la mascota y el dueño(encargado).`

      **URL:**
      `/v1/appointment/updateAppointment/:uid`

      **METODO:**
      `put`

      **CUERPO:**
        `"date": "2025-5-15",`
        `"pet": "67aac0c8ff343c2dbc13c285",`
        `"user": "67aab3dd58af236ab140692d"`
  
  

4. **Cancelar Cita**
   - Descripción: Implementar funcionalidad para cancelar una cita existente.

      `A travez de este metodo se podra cancelar la cita esto se podra hacer por el id de la cita generada.`

      **URL:**
      `v1/appointment/cancelarAppointment/:uid`

      **METODO:** 
      `patch`

      **CUERPO:** 
      `id de la cita a cancelar`
  
