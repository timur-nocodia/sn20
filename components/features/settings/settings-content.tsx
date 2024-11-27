"use client";

import { useSearchParams } from 'next/navigation';
import AccountSettings from './settings-sections/account-settings';
import TimeSettings from './settings-sections/time-settings';
import DisplaySettings from './settings-sections/display-settings';
import NotificationSettings from './settings-sections/notification-settings';
import IntegrationSettings from './settings-sections/integration-settings';
import SupportSettings from './settings-sections/support-settings';
import DangerZone from './settings-sections/danger-zone';
import SubscriptionSettings from './settings-sections/subscription-settings';
import UsageSettings from './settings-sections/usage-settings';

export default function SettingsContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'account';

  const sections = {
    account: AccountSettings,
    subscription: SubscriptionSettings,
    usage: UsageSettings,
    time: TimeSettings,
    display: DisplaySettings,
    notifications: NotificationSettings,
    integrations: IntegrationSettings,
    support: SupportSettings,
    danger: DangerZone
  };

  const Section = sections[currentTab as keyof typeof sections];

  return (
    <div className="flex-1">
      <Section />
    </div>
  );
}