import 'package:flutter/material.dart';
import 'colors.dart';
import 'spacing.dart';

class CronixTheme {
  static ThemeData get dark {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: CronixColors.background,
      colorScheme: ColorScheme.dark(
        primary: CronixColors.accent,
        secondary: CronixColors.accentLight,
        surface: CronixColors.surface,
        error: CronixColors.error,
        onPrimary: CronixColors.text,
        onSecondary: CronixColors.text,
        onSurface: CronixColors.text,
        onError: CronixColors.text,
      ),
      textTheme: _buildTextTheme(),
      appBarTheme: AppBarTheme(
        backgroundColor: CronixColors.background,
        foregroundColor: CronixColors.text,
        elevation: 0,
        scrolledUnderElevation: 1,
      ),
      cardTheme: CardTheme(
        color: CronixColors.surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: CronixRadius.radiusMD,
          side: const BorderSide(color: CronixColors.border),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: CronixColors.accent,
          foregroundColor: CronixColors.text,
          shape: RoundedRectangleBorder(
            borderRadius: CronixRadius.radiusMD,
          ),
          padding: CronixSpacing.paddingHorizontalMD.copyWith(
            top: CronixSpacing.sm,
            bottom: CronixSpacing.sm,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: CronixColors.surface,
        border: OutlineInputBorder(
          borderRadius: CronixRadius.radiusMD,
          borderSide: const BorderSide(color: CronixColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: CronixRadius.radiusMD,
          borderSide: const BorderSide(color: CronixColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: CronixRadius.radiusMD,
          borderSide: const BorderSide(color: CronixColors.accent, width: 2),
        ),
        contentPadding: CronixSpacing.paddingSM,
      ),
      dividerTheme: const DividerThemeData(
        color: CronixColors.divider,
        thickness: 1,
      ),
      dialogTheme: DialogTheme(
        backgroundColor: CronixColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: CronixRadius.radiusLG,
        ),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: CronixColors.surfaceLight,
        contentTextStyle: TextStyle(color: CronixColors.text),
        shape: RoundedRectangleBorder(
          borderRadius: CronixRadius.radiusMD,
        ),
      ),
    );
  }
  
  static TextTheme _buildTextTheme() {
    return TextTheme(
      displayLarge: TextStyle(
        fontSize: 57,
        fontWeight: FontWeight.w400,
        color: CronixColors.text,
        letterSpacing: -0.25,
      ),
      displayMedium: TextStyle(
        fontSize: 45,
        fontWeight: FontWeight.w400,
        color: CronixColors.text,
      ),
      displaySmall: TextStyle(
        fontSize: 36,
        fontWeight: FontWeight.w400,
        color: CronixColors.text,
      ),
      headlineLarge: TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.w600,
        color: CronixColors.text,
      ),
      headlineMedium: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        color: CronixColors.text,
      ),
      headlineSmall: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: CronixColors.text,
      ),
      titleLarge: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.w500,
        color: CronixColors.text,
      ),
      titleMedium: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: CronixColors.text,
        letterSpacing: 0.15,
      ),
      titleSmall: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: CronixColors.text,
        letterSpacing: 0.1,
      ),
      bodyLarge: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: CronixColors.text,
        letterSpacing: 0.5,
      ),
      bodyMedium: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: CronixColors.text,
        letterSpacing: 0.25,
      ),
      bodySmall: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: CronixColors.textSecondary,
        letterSpacing: 0.4,
      ),
      labelLarge: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: CronixColors.text,
        letterSpacing: 0.1,
      ),
      labelMedium: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: CronixColors.text,
        letterSpacing: 0.5,
      ),
      labelSmall: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        color: CronixColors.textSecondary,
        letterSpacing: 0.5,
      ),
    );
  }
}
