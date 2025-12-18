// Telegram Mini App utilities

export const initTelegramApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Initialize the app
    tg.ready();
    
    // Expand to full height
    tg.expand();
    
    // Enable vertical swipes
    tg.enableVerticalSwipes();
    
    // Set header color to match app theme
    tg.setHeaderColor('#ff6b35');
    
    // Set background color
    tg.setBackgroundColor('#f8f9fa');
    
    // Disable closing confirmation for better UX
    tg.disableClosingConfirmation();
    
    // Lock orientation to portrait (optional)
    tg.lockOrientation();
    
    return tg;
  }
  return null;
};

export const isTelegramApp = () => {
  return !!window.Telegram?.WebApp;
};

export const getTelegramUser = () => {
  const tg = window.Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user) {
    return {
      id: tg.initDataUnsafe.user.id,
      firstName: tg.initDataUnsafe.user.first_name,
      lastName: tg.initDataUnsafe.user.last_name,
      username: tg.initDataUnsafe.user.username,
      languageCode: tg.initDataUnsafe.user.language_code,
    };
  }
  return null;
};

export const getTelegramTheme = () => {
  const tg = window.Telegram?.WebApp;
  return tg?.themeParams || {};
};

export const showTelegramBackButton = (onBack) => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.BackButton.show();
    tg.BackButton.onClick(onBack);
  }
};

export const hideTelegramBackButton = () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.BackButton.hide();
  }
};

export const showTelegramMainButton = (text, onClick) => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.MainButton.setText(text);
    tg.MainButton.show();
    tg.MainButton.onClick(onClick);
  }
};

export const hideTelegramMainButton = () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.MainButton.hide();
  }
};

export const closeTelegramApp = () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.close();
  }
};

export const sendOrderNotification = async (orderData, botToken, adminChatId) => {
  if (!botToken || !adminChatId) {
    console.warn('Telegram bot credentials not configured');
    return;
  }

  const message = `
🛒 *New Order Received!*

📦 Order ID: ${orderData.id}
📱 Phone: ${orderData.phone_number}
💰 Total: $${orderData.total_amount.toFixed(2)}

*Items:*
${orderData.items.map(item => 
  `• ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

⏰ ${new Date().toLocaleString()}
  `.trim();

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    throw error;
  }
};

