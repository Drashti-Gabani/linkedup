#!/bin/bash

# Script to check if all required Comfortaa fonts are present

echo "🔍 Checking for Comfortaa fonts..."
echo ""

FONTS_DIR="assets/fonts"
REQUIRED_FONTS=(
  "Comfortaa-Regular.ttf"
  "Comfortaa-Medium.ttf"
  "Comfortaa-SemiBold.ttf"
  "Comfortaa-Bold.ttf"
)

MISSING_FONTS=()

# Check if fonts directory exists
if [ ! -d "$FONTS_DIR" ]; then
  echo "❌ Fonts directory not found: $FONTS_DIR"
  echo "📁 Creating fonts directory..."
  mkdir -p "$FONTS_DIR"
fi

# Check each required font
for font in "${REQUIRED_FONTS[@]}"; do
  if [ -f "$FONTS_DIR/$font" ]; then
    echo "✅ Found: $font"
  else
    echo "❌ Missing: $font"
    MISSING_FONTS+=("$font")
  fi
done

echo ""

# Summary
if [ ${#MISSING_FONTS[@]} -eq 0 ]; then
  echo "🎉 All required fonts are present!"
  echo ""
  echo "Next steps:"
  echo "1. Run: npx react-native-asset"
  echo "2. Rebuild your app:"
  echo "   - iOS: cd ios && pod install && cd .. && yarn ios"
  echo "   - Android: yarn android"
else
  echo "⚠️  Missing ${#MISSING_FONTS[@]} font(s):"
  for font in "${MISSING_FONTS[@]}"; do
    echo "   - $font"
  done
  echo ""
  echo "📥 Download instructions:"
  echo "1. Visit: https://fonts.google.com/specimen/Comfortaa"
  echo "2. Click 'Download family'"
  echo "3. Extract and copy the font files to: $FONTS_DIR"
  echo ""
  echo "See assets/fonts/README.md for detailed instructions."
fi

echo ""
