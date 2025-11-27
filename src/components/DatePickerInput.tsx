import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useTheme } from '../hooks/useTheme';
import CalendarIcon from './icons/CalendarIcon';
import CheckmarkIcon from './icons/CheckmarkIcon';

interface DatePickerInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  showCheckmark?: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  containerStyle?: object;
  inputWrapperStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
  iconColor?: string;
  showLabel?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  placeholder = 'dd/mm/yy',
  label,
  showCheckmark = false,
  isFocused = false,
  onFocus,
  onBlur,
  editable = true,
  containerStyle,
  inputWrapperStyle,
  inputStyle,
  labelStyle,
  iconColor,
  showLabel = true,
  open,
  onOpenChange,
}) => {
  const { colors, isDark } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? parseDateString(value) : null,
  );
  const [slideAnim] = useState(new Animated.Value(0));

  // Sync with external open prop
  useEffect(() => {
    if (open !== undefined) {
      setShowPicker(open);
    }
  }, [open]);

  // Animate iOS modal
  useEffect(() => {
    if (showPicker && Platform.OS === 'ios') {
      // Reset animation value first
      slideAnim.setValue(0);
      // Then animate in
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else if (!showPicker && Platform.OS === 'ios') {
      // Animate out
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showPicker, slideAnim]);

  // Update selectedDate when value changes externally
  useEffect(() => {
    if (value) {
      const parsed = parseDateString(value);
      if (parsed) {
        setSelectedDate(parsed);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Parse date string in dd/mm/yy format
  function parseDateString(dateString: string): Date | null {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    // Handle 2-digit year (assume 2000s for years < 50, 1900s otherwise)
    const fullYear = year < 50 ? 2000 + year : 1900 + year;

    if (isNaN(day) || isNaN(month) || isNaN(fullYear)) return null;

    return new Date(fullYear, month, day);
  }

  // Format date to dd/mm/yy
  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  const handleDateChange = (event: DateTimePickerEvent, date?: Date): void => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (onOpenChange) {
        onOpenChange(false);
      }
      if (onBlur) {
        onBlur();
      }
    }

    if (event.type === 'set' && date) {
      setSelectedDate(date);
      const formattedDate = formatDate(date);
      onChange(formattedDate);
    } else if (event.type === 'dismissed') {
      setShowPicker(false);
      if (onOpenChange) {
        onOpenChange(false);
      }
      if (onBlur) {
        onBlur();
      }
    }
  };

  const handlePress = (): void => {
    if (!editable) return;
    if (onFocus) {
      onFocus();
    }
    const newOpenState = true;
    setShowPicker(newOpenState);
    if (onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  const handleBlur = (): void => {
    if (onBlur) {
      onBlur();
    }
  };

  // For iOS, close picker when user confirms
  const handleIOSConfirm = (): void => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPicker(false);
      if (onOpenChange) {
        onOpenChange(false);
      }
      handleBlur();
    });
  };

  // Check if custom inputWrapperStyle has absolute positioning
  const hasAbsolutePosition =
    inputWrapperStyle &&
    typeof inputWrapperStyle === 'object' &&
    'position' in inputWrapperStyle &&
    inputWrapperStyle.position === 'absolute';

  return (
    <View style={containerStyle}>
      {showLabel && label && (
        <Text
          style={[
            styles.labelText,
            { color: colors.accentTertiary },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        disabled={!editable}
        style={hasAbsolutePosition ? undefined : { width: '100%' }}
      >
        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: colors.fieldBackground },
            // Remove marginTop if absolute positioning is used
            hasAbsolutePosition && { marginTop: 0 },
            isFocused && [
              styles.inputWrapperFocused,
              { borderColor: colors.accent },
            ],
            !isDark &&
              !isFocused && [
                styles.inputWrapperLight,
                { borderColor: colors.borderLight },
              ],
            inputWrapperStyle,
          ]}
        >
          <CalendarIcon
            width={13}
            height={14}
            color={iconColor || colors.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: colors.textPrimary }, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            value={value}
            editable={false}
            pointerEvents="none"
          />
          {showCheckmark && value && <CheckmarkIcon width={10} height={8} />}
        </View>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={handleIOSConfirm}
          hardwareAccelerated={true}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={handleIOSConfirm}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  backgroundColor: colors.background,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [400, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={e => e.stopPropagation()}
              >
                <View
                  style={[
                    styles.pickerHeader,
                    {
                      borderBottomColor: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                    },
                  ]}
                >
                  <TouchableOpacity onPress={handleIOSConfirm}>
                    <Text
                      style={[styles.pickerButton, { color: colors.accent }]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    textColor={colors.textPrimary}
                    themeVariant={isDark ? 'dark' : 'light'}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          textColor={colors.textPrimary}
          themeVariant={isDark ? 'dark' : 'light'}
          accentColor={colors.textPrimary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 11,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 0,
    left: 17,
    zIndex: 1,
  },
  inputWrapper: {
    marginTop: 24,
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 14,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputWrapperLight: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderWidth: 1.5,
  },
  input: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 0,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '80%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  datePickerWrapper: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pickerButton: {
    fontFamily: 'Comfortaa-SemiBold',
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default DatePickerInput;
