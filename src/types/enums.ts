export enum COMPANY_SIZE {
  ONE_TO_TEN = "1-10",
  ELEVEN_TO_TWENTY = "11-20",
  TWENTY_ONE_TO_FIFTY = "21-50",
  FIFTY_ONE_TO_ONE_HUNDRED = "51-100",
  ONE_HUNDRED_ONE_TO_TWO_HUNDRED = "101-200",
  TWO_HUNDRED_ONE_TO_FIVE_HUNDRED = "201-500",
  FIVE_HUNDRED_ONE_TO_ONE_THOUSAND = "501-1000",
  ONE_THOUSAND_ONE_TO_TWO_THOUSAND = "1001-2000",
  TWO_THOUSAND_ONE_TO_FIVE_THOUSAND = "2001-5000",
  FIVE_THOUSAND_ONE_TO_TEN_THOUSAND = "5001-10000",
  TEN_THOUSAND_ONE_PLUS = "10001+",
}

export enum EMAIL_STATUS {
  VALID = "verified",
  INVALID = "invalid",
  QUESTIONABLE = "questionable",
  NO_STATUS = "noStatus",
}

export enum CAMPAIGN_STAGE {
  NOT_STARTED = "not-started",
  DISCOVERY = "discovery",
  VALUE_PROPOSITION = "value-proposition",
  PROPOSAL = "proposal",
  NEGOTIATING = "negotiating",
  CLOSED_WON = "closed-won",
  CLOSED_LOST = "closed-lost",
  ACCOUNT_PLAN = "account-plan",
}

export enum SHARE_TYPE {
  PRIVATE = "private",
  VIEW_SHARED = "viewShared",
  EDIT_SHARED = "editShared",
}

export enum CADENCE_STEP_TYPE {
  AUTO_EMAIL = "autoEmail",
  PHONE_CALL = "phoneCall",
  MANUAL_EMAIL = "manualEmail",
  LINKEDIN_CONNECT = "linkedinConnect",
  LINKEDIN_SEND_MESSAGE = "linkedinSendMessage",
  LINKEDIN_VIEW_PROFILE = "linkedinViewProfile",
  LINKEDIN_INTERACT_WITH_POST = "linkedinInteractWithPost",
  ACTION_ITEM = "actionItem",
}

export enum LEAD_STATUS {
  COLD = "cold",
  APPROACHING = "approaching",
  REPLIED = "replied",
  INTERESTED = "interested",
  NOT_INTERESTED = "not-interested",
  UNRESPONSIVE = "unresponsive",
  BAD_DATA = "bad-data",
  CHANGED_JOB = "changed-job",
  OPEN = "open",
  UNQUALIFIED = "unqualified",
}

export enum CADENCE_STEP_STATUS {
  NOT_SENT = "notSent",
  ACTIVE = "active",
  PAUSED = "paused",
  BOUNCED = "bounced",
  FAILED = "failed",
  FINISHED = "finished",
}

export enum MAILING_STATE {
  DRAFT = "drafted",
  SCHEDULED = "scheduled",
  DELIVERED = "delivered",
  BOUNCED = "bounced",
  OPENED = "opened",
  REPLIED = "replied",
}

export enum DOCUMENT_TYPE {
  CASE_STUDY = "case-study",
  TESTIMONIAL = "testimonial",
}

export enum TASK_STATE {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
  SKIPPED = "skipped",
  ARCHIVED = "archived",
}
