import { TextInput as RNTextInput, View, Text } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

export interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  className?: string;
}

export function TextInput({
  placeholder,
  value,
  onChangeText,
  label,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  className,
}: TextInputProps) {
  const colors = useColors();

  return (
    <View className="gap-2">
      {label && (
        <Text className="text-sm font-semibold text-foreground">{label}</Text>
      )}
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        placeholderTextColor={colors.muted}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          color: colors.foreground,
          backgroundColor: colors.background,
        }}
        className={className}
      />
    </View>
  );
}
