import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "@/contexts/ThemeProvider";

// Dynamic class parser
const injectThemeClasses = (className: string, theme: string) => {
  return className.replace(
    /(\b(?:bg|text|border))-(primary|background|accent|surface|[a-zA-Z]+)/g,
    (_, prefix, key) => `${prefix}-${theme}-${key}`
  );
};

export const ThemedText: React.FC<TextProps & { className?: string }> = ({
  className = "",
  ...props
}) => {
  const { theme } = useTheme();

  const themedClassName = injectThemeClasses(className, theme);

  return <RNText className={themedClassName} {...props} />;
};
