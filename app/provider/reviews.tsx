import React from 'react';
import { Screen, Text, Card, Rating, EmptyState } from '@/components';
import { reviews } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderReviews() {
  const theme = useTheme();
  return (
    <Screen title="Customer reviews" onBack>
      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" />
      ) : (
        reviews.map((r) => (
          <Card key={r.id}>
            <Text variant="title">{r.author}</Text>
            <Rating value={r.rating} />
            <Text variant="body">{r.text}</Text>
            <Text variant="caption" muted>{r.date}</Text>
          </Card>
        ))
      )}
    </Screen>
  );
}
