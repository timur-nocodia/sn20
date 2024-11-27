"use client";

import { ScrollArea } from "@/components/ui-components/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-components/card";

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
