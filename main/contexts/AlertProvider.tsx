import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Animated,
  Dimensions,
  FancyText,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

type AlertType = "success" | "error" | "warning" | "info";
type AlertContextType = (type: AlertType, message: string) => void;

const AlertContext = createContext<AlertContextType>(() => {});
export const useAlert = () => useContext(AlertContext);

const SCREEN_WIDTH = Dimensions.get("window").width;

const alertColors = {
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
  info: "#2196F3",
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);
  const translateY = useRef(new Animated.Value(-100)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAlert({ type, message });

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setAlert(null);
      });
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && (
        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor: alertColors[alert.type],
              transform: [{ translateY }],
            },
          ]}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
              }).start(() => {
                setAlert(null);
              });
            }}
          >
            <FancyText style={styles.alertFancyText}>{alert.message}</FancyText>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  alertFancyText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
