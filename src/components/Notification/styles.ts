import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

export const Notification = styled.TouchableOpacity``;

export const Icon = styled(Ionicons)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;
