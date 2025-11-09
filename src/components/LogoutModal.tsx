import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: isDark ? '#2D2D2D' : '#FFFFFF' },
          ]}
        >
          <Text
            style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}
          >
            Logout
          </Text>
          <Text
            style={[
              styles.message,
              { color: isDark ? '#ADADAD' : '#666666' },
            ]}
          >
            Are you sure you want to logout?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: isDark ? '#1A1A1A' : '#F5F7F9' },
              ]}
              onPress={onCancel}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isDark ? '#FFFFFF' : '#000000' },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <LinearGradient
                colors={['#A776FC', '#8239FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH - 60,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 26.76,
    marginBottom: 12,
  },
  message: {
    fontFamily: 'Sofia Pro',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15.61,
  },
  confirmButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmButtonText: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15.61,
    color: '#FFFFFF',
  },
});

export default LogoutModal;
