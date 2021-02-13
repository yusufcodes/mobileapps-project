import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog as PaperDialog,
  Portal,
} from 'react-native-paper';

const Dialog = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog}>Show Dialog</Button>
      <Portal>
        <PaperDialog visible={visible} onDismiss={hideDialog}>
          <PaperDialog.Title>Alert</PaperDialog.Title>
          <PaperDialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </PaperDialog.Content>
          <PaperDialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </PaperDialog.Actions>
        </PaperDialog>
      </Portal>
    </View>
  );
};

export default Dialog;
