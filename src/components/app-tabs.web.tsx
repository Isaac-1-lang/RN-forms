import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export default function AppTabs() {
  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="registration_form" href="/registration_form" asChild>
            <TabButton>User Registr</TabButton>
          </TabTrigger>
          <TabTrigger name="job_application_form" href="/job_application_form" asChild>
            <TabButton>Job Appl</TabButton>
          </TabTrigger>
          <TabTrigger name="money_transfer_form" href="/money_transfer_form" asChild>
            <TabButton>Money Trans</TabButton>
          </TabTrigger>
          <TabTrigger name="property_rental" href="/property_rental" asChild>
            <TabButton>Prop Rent</TabButton>
          </TabTrigger>
          <TabTrigger name="conference_registration" href="/conference_registration" asChild>
            <TabButton>Conference</TabButton>
          </TabTrigger>
          <TabTrigger name="college_application_form" href="/college_application_form" asChild>
            <TabButton>College Appl</TabButton>
          </TabTrigger>
          <TabTrigger name="checkout_form" href="/checkout_form" asChild>
            <TabButton>Checkout</TabButton>
          </TabTrigger>
          <TabTrigger name="appoint_request_form" href="/appoint_request_form" asChild>
            <TabButton>Appointment</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
      <TabSlot style={{ flex: 1 }} />
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          e-Forms
        </ThemedText>

        <View style={styles.tabsWrapper}>
          {props.children}
        </View>

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: Spacing.three,
    flexShrink: 0,
  },
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
    flexWrap: 'wrap',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
    flexShrink: 0,
  },
});
