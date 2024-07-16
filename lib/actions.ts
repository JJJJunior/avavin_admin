import prisma from "@/prisma";

export const UserCreate = async (webhook_data) => {
  try {
    const res = await prisma.user.create({
      data: {
        id: webhook_data.id,
        email_address: {
          create: webhook_data.email_addresses.map((item) => ({
            id: item.id,
            email_address: item.email_address,
            object: item.object,
          })),
        },
        first_name: webhook_data.first_name,
        last_name: webhook_data.last_name,
        last_sign_in_at: webhook_data.last_sign_in_at,
        image_url: webhook_data.image_url,
        object: webhook_data.object,
        created_at: webhook_data.created_at,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const UserUpdate = async (webhook_data) => {
  try {
    const res = await prisma.user.update({
      where: {
        id: webhook_data.id,
      },
      data: {
        email_address: {
          create: webhook_data.email_addresses.map((item) => ({
            email_address: item.email_address,
            object: item.object,
          })),
        },
        first_name: webhook_data.first_name,
        last_name: webhook_data.last_name,
        last_sign_in_at: webhook_data.last_sign_in_at,
        image_url: webhook_data.image_url,
        object: webhook_data.object,
        created_at: webhook_data.created_at,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const UserDelete = async (webhook_data) => {
  try {
    const res = await prisma.user.delete({
      where: {
        id: webhook_data.id,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const SessionCreate = async (webhook_data) => {
  try {
    const res = await prisma.session.create({
      data: {
        id: webhook_data.id,
        client_id: webhook_data.client_id,
        session_token: webhook_data.session_token,
        created_at: webhook_data.created_at,
        expires_at: webhook_data.expires_at,
        last_active_at: webhook_data.last_active_at,
        object: webhook_data.object,
        status: webhook_data.status,
        updated_at: webhook_data.updated_at,
        user_id: webhook_data.user_id,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const SessionUpdate = async (webhook_data) => {
  try {
    const res = await prisma.session.update({
      where: {
        id: webhook_data.id,
      },
      data: {
        client_id: webhook_data.client_id,
        session_token: webhook_data.session_token,
        created_at: webhook_data.created_at,
        expires_at: webhook_data.expires_at,
        last_active_at: webhook_data.last_active_at,
        object: webhook_data.object,
        status: webhook_data.status,
        updated_at: webhook_data.updated_at,
        user_id: webhook_data.user_id,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
