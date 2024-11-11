import i18next from "i18next";

export const ringUser = async (
  userIds: string[]
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const response = await fetch('https://huvdrbcqskkoflotlavi.supabase.co/functions/v1/send_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIds,
        title: i18next.t('notifications.ring.title'),
        body: i18next.t('notifications.ring.body')
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