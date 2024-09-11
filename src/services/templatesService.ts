export interface TemplateModel {
  id?: string;
  archivedAt?: Date | null;
  bodyHtml?: string | null;
  bodyText?: string | null;
  deliverCount?: number;
  failureCount?: number;
  name?: string | null;
  openCount?: number;
  optOutCount?: number;
  ownerId?: string | null;
  replyCount?: number;
  shareType?: boolean;
  subject?: string | null;
  clonedFromId?: string | null;
}
