"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui-components/avatar";

interface PostCardProps {
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

export function PostCard({ title, content, author, date }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {author.name} · {date}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
