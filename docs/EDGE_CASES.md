# Edge cases

Handled in the UI where it is cheap. Called out here when it is mock-only.

## Money

- ~15% p.a. and 9.99% p.a. are illustrations, not promises. Copy uses * / T&C.
- Borrow is a lien. UI never says “withdraw from MF”.
- Credit unlocks at ₹25,000 invested. Below that, Borrow shows progress, not a draw.
- Draw is capped at 50% of invested minus amount already out. Repay clears the draw; units were never sold.
- Daily SIP is clamped ₹21–₹50,000. Save steppers and pills respect that.
- Stress Test “₹10L” is an illustrative target, not a BlinkMoney goal product.
- Stress “Correction” / “Severe” are a 1–2 year shock then recovery. Not a forever −4% CAGR.
- Raising SIP on Stress updates the simulation only. Step-up sheet does not place an order.
- Debit fail (`failSip`) marks pending as failed and drops Momentum. Retry restores it. No live bank.

## Device / UI

- First paint: Stress shows a short skeleton, then the live mock.
- No SIP / no invested: Stress empty state → Save.
- Very new book (streak &lt; 3 days or invested &lt; ₹500): insufficient-data state. Current seed skips this.
- Share sheet cancelled: OS handles it; nothing crashes.
- Android: progress bars use pixel width (not `%` in Reanimated). Ring charts use `originX` / `originY`. Haptics are swallowed if the device has no vibrator. `Share` includes a `title` for the Android sheet. Tab indicator is transform-only (elevation on a translating view flickers on Android). Keyboard on Save uses `softwareKeyboardLayoutMode: resize`.
- Small phones: five-tab pill keeps the 4-tab circle size; slots get narrower, icons do not shrink into dots.
- Profile is a stack screen, so it does not reserve tab-bar padding.
- Logout is a mock confirm → Home. No session.

## Out of scope

- KYC, real NAV, weekends, pledge status, offline queue, RTL, landscape.
- Changing theme to light: the control cycles the label; the app stays dark (the product is black).
