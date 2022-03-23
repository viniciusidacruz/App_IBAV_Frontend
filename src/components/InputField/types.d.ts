import { TextInputProps } from "react-native";

export type IContentInputProps = TextInputProps & {
  icon?: React.ComponentProps<typeof Feather>["name"];
  value?: string | undefined;
  primary?: boolean;
  label?: string;
};

export type IColorsProps = {
  primary?: boolean;
};
