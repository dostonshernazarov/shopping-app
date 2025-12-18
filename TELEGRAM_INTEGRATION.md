# Telegram Mini App Integration Guide

This guide will help you integrate your marketplace as a Telegram Mini App.

## Prerequisites

1. A Telegram account
2. Your marketplace deployed to Vercel (or any HTTPS URL)
3. Access to [@BotFather](https://t.me/botfather) on Telegram

## Step 1: Create or Configure Your Bot

1. Open Telegram and search for **@BotFather**
2. Send the command `/newbot` (or use an existing bot)
3. Follow the prompts to create your bot:
   - Choose a name (e.g., "FoodMarket Bot")
   - Choose a username (e.g., "foodmarket_bot")
4. Save the bot token provided by BotFather

## Step 2: Set Up Web App

After creating your bot, configure the Web App:

1. Send `/mybots` to BotFather
2. Select your bot
3. Click "Bot Settings" > "Menu Button"
4. Choose "Edit Menu Button URL"
5. Enter your Vercel URL (e.g., `https://your-app.vercel.app`)
6. Set a button text (e.g., "🛒 Open Store")

## Step 3: Configure Menu Button

```
/setmenubutton
@your_bot_username
button_text: 🛒 Shop Now
url: https://your-app.vercel.app
```

## Step 4: Add Telegram Mini App Features to Your Code

Create a new file `src/utils/telegram.js`:

```javascript
// Telegram Mini App utilities

export const initTelegramApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Initialize the app
    tg.ready();
    
    // Expand to full height
    tg.expand();
    
    // Set theme colors
    tg.setHeaderColor('#ff6b35');
    tg.setBackgroundColor('#f8f9fa');
    
    // Enable closing confirmation
    tg.enableClosingConfirmation();
    
    return tg;
  }
  return null;
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

export const sendOrderToTelegramAdmin = async (orderData, botToken, adminChatId) => {
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

export const closeTelegramApp = () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.close();
  }
};
```

## Step 5: Update Your App.jsx

Add Telegram initialization to your main App component:

```javascript
import { useEffect } from 'react';
import { initTelegramApp, getTelegramUser } from './utils/telegram';

function App() {
  useEffect(() => {
    const tg = initTelegramApp();
    if (tg) {
      console.log('Telegram Mini App initialized');
      const user = getTelegramUser();
      if (user) {
        console.log('Telegram user:', user);
        // You can pre-fill user data in forms
      }
    }
  }, []);

  // ... rest of your app
}
```

## Step 6: Send Order Notifications to Admin

Update `src/components/Checkout.jsx` to send notifications:

```javascript
import { sendOrderToTelegramAdmin } from '../utils/telegram';

// In your handleSubmit function, after creating the order:
try {
  const order = await createOrder(orderData);
  
  // Send Telegram notification
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const adminChatId = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID;
  
  if (botToken && adminChatId) {
    await sendOrderToTelegramAdmin(
      { ...order, items: cart },
      botToken,
      adminChatId
    );
  }
  
  setSuccess(true);
} catch (err) {
  // handle error
}
```

## Step 7: Add Environment Variables

Add to your `.env` file:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
VITE_TELEGRAM_ADMIN_CHAT_ID=your_telegram_chat_id
```

To get your admin chat ID:
1. Message your bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for your `chat.id` in the response

## Step 8: Include Telegram Web App Script

Update your `index.html`:

```html
<head>
  <!-- ... other tags ... -->
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
```

## Step 9: Test Your Mini App

1. Open your bot in Telegram
2. Click the menu button or send a command
3. Your marketplace should open inside Telegram

## Additional Features

### Use Telegram Main Button for Checkout

```javascript
import { showTelegramMainButton } from '../utils/telegram';

// In your Cart component
useEffect(() => {
  if (cart.length > 0) {
    showTelegramMainButton('Checkout', () => {
      setShowCheckout(true);
    });
  }
}, [cart]);
```

### Use Native Telegram Popups

```javascript
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.showAlert('Your order has been placed!');
  // or
  tg.showPopup({
    title: 'Order Confirmation',
    message: 'Your order has been received!',
    buttons: [{ type: 'ok' }]
  });
}
```

## Testing Locally

To test Telegram Mini App features locally:

1. Use ngrok to expose your local server:
   ```bash
   ngrok http 3000
   ```

2. Use the ngrok HTTPS URL in BotFather settings

3. Remember: Telegram Mini Apps only work over HTTPS

## Security Considerations

1. **Validate Telegram Init Data**: Always validate the `initData` on your backend
2. **Rate Limiting**: Implement rate limiting for orders
3. **Admin Authentication**: Use proper authentication for admin panel (not just password)

## Useful Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Web App JavaScript Interface](https://core.telegram.org/bots/webapps#initializing-mini-apps)

## Troubleshooting

**Issue: App doesn't load in Telegram**
- Ensure your URL is HTTPS
- Check that Telegram script is loaded
- Clear Telegram cache: Settings > Data and Storage > Clear Cache

**Issue: Can't send notifications**
- Verify bot token is correct
- Ensure you've started a conversation with your bot
- Check admin chat ID is correct

**Issue: Styling looks different in Telegram**
- Test in both light and dark themes
- Use Telegram's color scheme variables
- Ensure responsive design works on mobile

---

For more help, refer to the [official Telegram Mini Apps documentation](https://core.telegram.org/bots/webapps).

