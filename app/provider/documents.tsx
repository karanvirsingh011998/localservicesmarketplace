import React from 'react';
import { Screen, Text, ListRow, Button, useToast } from '@/components';

export default function Documents() {
  const toast = useToast();
  return (
    <Screen title="Upload documents" onBack>
      <Text variant="body" muted>KYC and certificates (mock upload).</Text>
      <ListRow title="Aadhaar / ID proof" subtitle="Uploaded" icon="id-card-outline" showChevron={false} />
      <ListRow title="Address proof" subtitle="Pending" icon="document-outline" onPress={() => toast.show('Upload started (mock)')} />
      <ListRow title="Trade certificate" subtitle="Optional" icon="ribbon-outline" onPress={() => toast.show('Upload started (mock)')} />
      <Button title="Submit for review" onPress={() => toast.show('Submitted (mock)')} />
    </Screen>
  );
}
