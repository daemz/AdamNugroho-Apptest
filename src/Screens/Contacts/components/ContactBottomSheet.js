import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';

const ContactBottomSheet = ({
  actionSheetRef,
  children,
  style,
  onClose,
  topView,
  onPositionChanged,
  isFullScreenBS,
  isFullScreen,
  useScrollView,
}) => {
  // const { ContactBottomSheetCloseable } = useSelector(state => state.HomeReducer);
  const [disableOnClose, setDisableOnClose] = useState(true);
  const [gestureEnableValue, setGestureEnableValue] = useState(true);
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Enable/disable closeable sheet by watching ContactBottomSheetCloseable (redux) change
  // useEffect(() => {
  //   setDisableOnClose(prevDisableOnClose => !prevDisableOnClose);
  // }, [ContactBottomSheetCloseable]);

  // Handle action sheet gesture
  useEffect(() => {
    if (isFullScreenBS) {
      setGestureEnableValue(false);
    } else {
      setGestureEnableValue(true);
    }
  }, [isFullScreenBS]);

  const renderCustomHeader = () => {
    return <View style={styles.dragIndicator} />;
  };

  return (
    <View style={styles.root}>
      <ActionSheet
        ref={actionSheetRef}
        headerAlwaysVisible
        gestureEnabled={gestureEnableValue}
        initialOffsetFromBottom={isFullScreenBS || isFullScreen ? 1 : isFullScreen ? 0.91 : 0.855}
        springOffset={0}
        onClose={handleClose}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        overlayColor="black"
        defaultOverlayOpacity={0.7}
        keyboardShouldPersistTaps="handled"
        containerStyle={styles.actionSheet}
        closable={disableOnClose}
        CustomHeaderComponent={renderCustomHeader()}>
        {useScrollView ? (
          <ScrollView
            key="scrollView"
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            scrollEnabled={onPositionChanged}
            style={[styles.list, style]}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={{ height: '100%' }}>{children}</View>
        )}
      </ActionSheet>
    </View>
  );
};

ContactBottomSheet.defaultProps = {
  onClose: () => null,
  style: {},
  topView: true,
  isFullScreenBS: false,
  useScrollView: true,
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flex: 1,
  },
  actionSheet: {
    backgroundColor: "#fff",
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  list: {
    width: '100%',
    padding: 12,
    paddingHorizontal: 0,
    paddingBottom: 80,
    backgroundColor: "#fff",
  },
  listBottom: {
    width: '100%',
    padding: 12,
    paddingHorizontal: 0,
  },
  dragIndicator: {
    alignSelf: 'center',
    width: 74,
    height: 4,
    backgroundColor: "grey",
    borderRadius: 8,
    marginVertical: 12,
  },
});

export default ContactBottomSheet;
