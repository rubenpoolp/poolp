
export const  sendNotif = async (
  userIds: string[],
  title: string,
  body: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const response = await fetch('https://huvdrbcqskkoflotlavi.supabase.co/functions/v1/send_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIds,
        title: title,
        body: body
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending notification: ${response.status}`);
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { success: false, error: error as Error };
  }
};