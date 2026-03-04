import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  const variantClasses = {
    default: "bg-surface rounded-2xl p-5 border border-border shadow-sm",
    elevated: "bg-surface rounded-2xl p-5 border border-border shadow-lg shadow-black/10",
    outlined: "bg-transparent rounded-2xl p-5 border-2 border-border",
  };

  return (
    <View
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </View>
  );
}
