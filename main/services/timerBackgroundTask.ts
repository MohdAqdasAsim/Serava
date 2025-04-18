import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_TASK = 'background-focus-timer';

TaskManager.defineTask(TIMER_TASK, async () => {
  try {
    const state = await AsyncStorage.getItem('FOCUS_TIMER_STATE');
    if (state) {
      const { secondsLeft, isRunning, onBreak } = JSON.parse(state);
      if (isRunning && secondsLeft > 0) {
        // Decrease timer by 60 seconds
        await AsyncStorage.setItem(
          'FOCUS_TIMER_STATE',
          JSON.stringify({ secondsLeft: secondsLeft - 60, isRunning, onBreak })
        );
      }
    }
    return BackgroundFetch.Result.NewData; // Indicate new data was processed
  } catch (e) {
    console.error('Error in background task:', e);
    return BackgroundFetch.Result.Failed; // Indicate failure if any issue
  }
});

export async function registerTimerTask() {
  try {
    await BackgroundFetch.registerTaskAsync(TIMER_TASK, {
      minimumInterval: 60, // 1 minute (can't be lower on iOS)
      stopOnTerminate: false, // Keep task running after app is terminated
      startOnBoot: true, // Restart the task after a device reboot
    });
  } catch (e) {
    console.error('Failed to register background task:', e);
  }
}
