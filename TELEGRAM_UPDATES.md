# Telegram Mini App Updates

## ✅ Changes Implemented

### 1. Two Products Per Row in Telegram
- **Before**: 1 product per row (too much space)
- **After**: 2 products per row (better use of space)
- **Implementation**: Added CSS rules specifically for Telegram Mini App
- **Location**: `src/App.css` - `body.telegram-app .products-grid`

### 2. Contact Footer at Bottom
- **New Component**: `src/components/ContactFooter.jsx`
- **Features**:
  - Instagram link (if configured)
  - Telegram link (if configured)
  - Phone number (clickable, if configured)
- **Visibility**: Only shows in Telegram Mini App
- **Position**: Fixed at bottom of screen
- **Styling**: Clean, modern design with icons

## 📝 Environment Variables

Add these to your `.env` file:

```env
# Contact Information (shown in Telegram Mini App footer)
VITE_INSTAGRAM_URL=https://instagram.com/yourprofile
VITE_TELEGRAM_URL=https://t.me/yourchannel
VITE_CONTACT_PHONE=+1-555-123-4567
```

### Examples:

**Instagram:**
```env
VITE_INSTAGRAM_URL=https://instagram.com/foodmarket
```

**Telegram:**
```env
VITE_TELEGRAM_URL=https://t.me/foodmarket
# or for a group:
VITE_TELEGRAM_URL=https://t.me/foodmarket_group
```

**Phone:**
```env
VITE_CONTACT_PHONE=+998901234567
# or
VITE_CONTACT_PHONE=+1-555-123-4567
```

## 🚀 Deployment

### 1. Add to Vercel Environment Variables:

```bash
vercel env add VITE_INSTAGRAM_URL
vercel env add VITE_TELEGRAM_URL
vercel env add VITE_CONTACT_PHONE
```

Or via Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add each variable
3. Redeploy

### 2. Test Locally:

1. Add variables to `.env` file
2. Restart dev server: `npm run dev`
3. Test in Telegram Mini App
4. Verify:
   - ✅ 2 products per row
   - ✅ Footer shows at bottom
   - ✅ Links work correctly
   - ✅ Phone number is clickable

## 📱 Visual Changes

### Products Grid:
- **Desktop/Web**: Responsive grid (3-4 columns)
- **Mobile Browser**: 1-2 columns
- **Telegram Mini App**: **2 columns** (NEW!)

### Contact Footer:
- **Desktop/Web**: Not shown (regular footer instead)
- **Telegram Mini App**: Fixed footer at bottom with:
  - Instagram icon + link
  - Telegram icon + link
  - Phone icon + clickable number

## 🎨 Styling Details

### Products in Telegram:
- Smaller product cards (2 per row)
- Reduced image height (150px)
- Compact text (2-line description max)
- Full-width "Add to Cart" buttons
- Optimized spacing

### Contact Footer:
- Fixed position at bottom
- White background with border
- Icons from Lucide React
- Hover effects
- Responsive on small screens
- Doesn't overlap content

## 🔧 Technical Details

### Files Modified:
1. `src/App.jsx` - Added ContactFooter component
2. `src/App.css` - Added Telegram-specific styles
3. `src/components/ContactFooter.jsx` - New component
4. `env.template` - Added new environment variables

### CSS Classes:
- `body.telegram-app .products-grid` - 2 column grid
- `.contact-footer` - Footer styling
- `.contact-link` - Link styling

### Component Logic:
- Only renders in Telegram (`isTelegramApp()`)
- Conditionally shows links (if env vars exist)
- Phone number uses `tel:` protocol
- External links open in new tab

## 📋 Checklist

After deploying:

- [ ] Products show 2 per row in Telegram
- [ ] Contact footer appears at bottom
- [ ] Instagram link works (if configured)
- [ ] Telegram link works (if configured)
- [ ] Phone number is clickable (if configured)
- [ ] Footer doesn't overlap content
- [ ] Responsive on different screen sizes
- [ ] Environment variables added to Vercel

## 🐛 Troubleshooting

### Issue: Still showing 1 product per row

**Solution:**
- Clear Telegram cache
- Force refresh: Close and reopen Telegram
- Check CSS is deployed correctly

### Issue: Footer not showing

**Solution:**
- Verify you're testing in Telegram Mini App (not browser)
- Check `isTelegramApp()` returns true
- Verify component is imported in App.jsx

### Issue: Links not working

**Solution:**
- Verify environment variables are set
- Check URLs are correct format
- Ensure URLs start with `https://`
- Check Vercel environment variables are set

### Issue: Phone number not clickable

**Solution:**
- Verify phone number format (include country code)
- Check `tel:` protocol is working
- Test on actual device (not just browser)

## 📞 Contact Footer Examples

### Full Configuration:
```env
VITE_INSTAGRAM_URL=https://instagram.com/foodmarket
VITE_TELEGRAM_URL=https://t.me/foodmarket
VITE_CONTACT_PHONE=+998901234567
```

### Partial Configuration:
```env
# Only Instagram and phone
VITE_INSTAGRAM_URL=https://instagram.com/foodmarket
VITE_CONTACT_PHONE=+998901234567
# Telegram link will not show
```

### Minimum Configuration:
```env
# At least one contact method
VITE_CONTACT_PHONE=+998901234567
```

## 🎯 Next Steps

1. ✅ Add environment variables to `.env`
2. ✅ Test locally in Telegram
3. ✅ Add variables to Vercel
4. ✅ Deploy and test production
5. ✅ Verify all links work
6. ✅ Check responsive design

---

**All changes are backward compatible!** The app still works perfectly in regular browsers. 🎉

