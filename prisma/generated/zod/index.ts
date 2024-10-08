import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','createdAt','updatedAt']);

export const TaskScalarFieldEnumSchema = z.enum(['id','userId','title','description','status','tagIDs','sessionIDs','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','userId','taskIDs','focusDuration','breakDuration','rounds','completedRounds','endTime','startTime','in_progress','createdAt','updatedAt']);

export const TagScalarFieldEnumSchema = z.enum(['id','userId','taskIDs','tagDesc','color']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','userId','createdAt','updatedAt']);

export const MessageScalarFieldEnumSchema = z.enum(['id','conversationId','role','content','createdAt','updatedAt']);

export const PresetScalarFieldEnumSchema = z.enum(['id','userId','name','focusTime','breakTime']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const taskStatusSchema = z.enum(['BACKLOG','IN_PROGRESS','COMPLETED']);

export type taskStatusType = `${z.infer<typeof taskStatusSchema>}`

export const tagColorSchema = z.enum(['bg_red_200','bg_orange_200','bg_yellow_200','bg_lime_200','bg_emerald_200','bg_sky_200','bg_indigo_200','bg_fuchsia_200']);

export type tagColorType = `${z.infer<typeof tagColorSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  status: taskStatusSchema,
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  tagIDs: z.string().array(),
  sessionIDs: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  taskIDs: z.string().array(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date(),
  in_progress: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  color: tagColorSchema,
  id: z.string(),
  userId: z.string(),
  taskIDs: z.string().array(),
  tagDesc: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// PRESET SCHEMA
/////////////////////////////////////////

export const PresetSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  focusTime: z.number().int(),
  breakTime: z.number().int(),
})

export type Preset = z.infer<typeof PresetSchema>

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  tasks: z.boolean().optional(),
  conversations: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  conversations: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  tagIDs: z.boolean().optional(),
  sessionIDs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionCountOutputTypeArgsSchema: z.ZodType<Prisma.SessionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SessionCountOutputTypeSelectSchema: z.ZodType<Prisma.SessionCountOutputTypeSelect> = z.object({
  list_of_tasks: z.boolean().optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskIDs: z.boolean().optional(),
  focusDuration: z.boolean().optional(),
  breakDuration: z.boolean().optional(),
  rounds: z.boolean().optional(),
  completedRounds: z.boolean().optional(),
  endTime: z.boolean().optional(),
  startTime: z.boolean().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  list_of_tasks: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskIDs: z.boolean().optional(),
  tagDesc: z.boolean().optional(),
  color: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
}).strict()

export const ConversationArgsSchema: z.ZodType<Prisma.ConversationDefaultArgs> = z.object({
  select: z.lazy(() => ConversationSelectSchema).optional(),
  include: z.lazy(() => ConversationIncludeSchema).optional(),
}).strict();

export const ConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const ConversationSelectSchema: z.ZodType<Prisma.ConversationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  role: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()

// PRESET
//------------------------------------------------------

export const PresetArgsSchema: z.ZodType<Prisma.PresetDefaultArgs> = z.object({
  select: z.lazy(() => PresetSelectSchema).optional(),
}).strict();

export const PresetSelectSchema: z.ZodType<Prisma.PresetSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  focusTime: z.boolean().optional(),
  breakTime: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  conversations: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumtaskStatusFilterSchema),z.lazy(() => taskStatusSchema) ]).optional(),
  tagIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  sessionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tagIDs: z.lazy(() => SortOrderSchema).optional(),
  sessionIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumtaskStatusFilterSchema),z.lazy(() => taskStatusSchema) ]).optional(),
  tagIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  sessionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tagIDs: z.lazy(() => SortOrderSchema).optional(),
  sessionIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumtaskStatusWithAggregatesFilterSchema),z.lazy(() => taskStatusSchema) ]).optional(),
  tagIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  sessionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  focusDuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  breakDuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedRounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  in_progress: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  list_of_tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  in_progress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  list_of_tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  focusDuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  breakDuration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  rounds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  completedRounds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  in_progress: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  list_of_tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  in_progress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  focusDuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  breakDuration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rounds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  completedRounds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  in_progress: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  tagDesc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => EnumtagColorFilterSchema),z.lazy(() => tagColorSchema) ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  tagDesc: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId_tagDesc: z.lazy(() => TagUserIdTagDescCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId_tagDesc: z.lazy(() => TagUserIdTagDescCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId_tagDesc: z.lazy(() => TagUserIdTagDescCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  tagDesc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => EnumtagColorFilterSchema),z.lazy(() => tagColorSchema) ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  tagDesc: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  tagDesc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => EnumtagColorWithAggregatesFilterSchema),z.lazy(() => tagColorSchema) ]).optional(),
}).strict();

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PresetWhereInputSchema: z.ZodType<Prisma.PresetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PresetWhereInputSchema),z.lazy(() => PresetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PresetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PresetWhereInputSchema),z.lazy(() => PresetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  focusTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  breakTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PresetOrderByWithRelationInputSchema: z.ZodType<Prisma.PresetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetWhereUniqueInputSchema: z.ZodType<Prisma.PresetWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId_name: z.lazy(() => PresetUserIdNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId_name: z.lazy(() => PresetUserIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId_name: z.lazy(() => PresetUserIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PresetWhereInputSchema),z.lazy(() => PresetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PresetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PresetWhereInputSchema),z.lazy(() => PresetWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  focusTime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  breakTime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
}).strict());

export const PresetOrderByWithAggregationInputSchema: z.ZodType<Prisma.PresetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PresetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PresetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PresetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PresetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PresetSumOrderByAggregateInputSchema).optional()
}).strict();

export const PresetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PresetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PresetScalarWhereWithAggregatesInputSchema),z.lazy(() => PresetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PresetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PresetScalarWhereWithAggregatesInputSchema),z.lazy(() => PresetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  focusTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  breakTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema),
  tags: z.lazy(() => TagCreateNestedManyWithoutTasksInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTasksInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTasksNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTasksNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  list_of_tasks: z.lazy(() => TaskCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => SessionCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  list_of_tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
  list_of_tasks: z.lazy(() => TaskUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  list_of_tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => SessionCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  tagDesc: z.string(),
  color: z.lazy(() => tagColorSchema),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => TagCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.string(),
  color: z.lazy(() => tagColorSchema),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => TagUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => TagCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.string(),
  color: z.lazy(() => tagColorSchema)
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => TagUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversationsNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().optional(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  conversationId: z.string(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().optional(),
  conversationId: z.string(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PresetCreateInputSchema: z.ZodType<Prisma.PresetCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  focusTime: z.number().int(),
  breakTime: z.number().int()
}).strict();

export const PresetUncheckedCreateInputSchema: z.ZodType<Prisma.PresetUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  focusTime: z.number().int(),
  breakTime: z.number().int()
}).strict();

export const PresetUpdateInputSchema: z.ZodType<Prisma.PresetUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  focusTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PresetUncheckedUpdateInputSchema: z.ZodType<Prisma.PresetUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  focusTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PresetCreateManyInputSchema: z.ZodType<Prisma.PresetCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  focusTime: z.number().int(),
  breakTime: z.number().int()
}).strict();

export const PresetUpdateManyMutationInputSchema: z.ZodType<Prisma.PresetUpdateManyMutationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  focusTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PresetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PresetUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  focusTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const ConversationListRelationFilterSchema: z.ZodType<Prisma.ConversationListRelationFilter> = z.object({
  every: z.lazy(() => ConversationWhereInputSchema).optional(),
  some: z.lazy(() => ConversationWhereInputSchema).optional(),
  none: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumtaskStatusFilterSchema: z.ZodType<Prisma.EnumtaskStatusFilter> = z.object({
  equals: z.lazy(() => taskStatusSchema).optional(),
  in: z.lazy(() => taskStatusSchema).array().optional(),
  notIn: z.lazy(() => taskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => NestedEnumtaskStatusFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.object({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  tagIDs: z.lazy(() => SortOrderSchema).optional(),
  sessionIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumtaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumtaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => taskStatusSchema).optional(),
  in: z.lazy(() => taskStatusSchema).array().optional(),
  notIn: z.lazy(() => taskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => NestedEnumtaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtaskStatusFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  in_progress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z.object({
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  in_progress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  in_progress: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z.object({
  focusDuration: z.lazy(() => SortOrderSchema).optional(),
  breakDuration: z.lazy(() => SortOrderSchema).optional(),
  rounds: z.lazy(() => SortOrderSchema).optional(),
  completedRounds: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumtagColorFilterSchema: z.ZodType<Prisma.EnumtagColorFilter> = z.object({
  equals: z.lazy(() => tagColorSchema).optional(),
  in: z.lazy(() => tagColorSchema).array().optional(),
  notIn: z.lazy(() => tagColorSchema).array().optional(),
  not: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => NestedEnumtagColorFilterSchema) ]).optional(),
}).strict();

export const TagUserIdTagDescCompoundUniqueInputSchema: z.ZodType<Prisma.TagUserIdTagDescCompoundUniqueInput> = z.object({
  userId: z.string(),
  tagDesc: z.string()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskIDs: z.lazy(() => SortOrderSchema).optional(),
  tagDesc: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tagDesc: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tagDesc: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumtagColorWithAggregatesFilterSchema: z.ZodType<Prisma.EnumtagColorWithAggregatesFilter> = z.object({
  equals: z.lazy(() => tagColorSchema).optional(),
  in: z.lazy(() => tagColorSchema).array().optional(),
  notIn: z.lazy(() => tagColorSchema).array().optional(),
  not: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => NestedEnumtagColorWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtagColorFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtagColorFilterSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationRelationFilterSchema: z.ZodType<Prisma.ConversationRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetUserIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.PresetUserIdNameCompoundUniqueInput> = z.object({
  userId: z.string(),
  name: z.string()
}).strict();

export const PresetCountOrderByAggregateInputSchema: z.ZodType<Prisma.PresetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PresetAvgOrderByAggregateInput> = z.object({
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PresetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetMinOrderByAggregateInputSchema: z.ZodType<Prisma.PresetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PresetSumOrderByAggregateInputSchema: z.ZodType<Prisma.PresetSumOrderByAggregateInput> = z.object({
  focusTime: z.lazy(() => SortOrderSchema).optional(),
  breakTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedManyWithoutTasksInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagCreateWithoutTasksInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema),z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutList_of_tasksInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreatetagIDsInputSchema: z.ZodType<Prisma.TaskCreatetagIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const TaskCreatesessionIDsInputSchema: z.ZodType<Prisma.TaskCreatesessionIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const TagUncheckedCreateNestedManyWithoutTasksInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagCreateWithoutTasksInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema),z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutList_of_tasksInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumtaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumtaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => taskStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const TagUpdateManyWithoutTasksNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagCreateWithoutTasksInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema),z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutTasksInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutTasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutList_of_tasksNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutList_of_tasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutList_of_tasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutList_of_tasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutList_of_tasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdatetagIDsInputSchema: z.ZodType<Prisma.TaskUpdatetagIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const TaskUpdatesessionIDsInputSchema: z.ZodType<Prisma.TaskUpdatesessionIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutTasksNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagCreateWithoutTasksInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema),z.lazy(() => TagCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutTasksInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutTasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutList_of_tasksNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutList_of_tasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema),z.lazy(() => SessionCreateOrConnectWithoutList_of_tasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutList_of_tasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutList_of_tasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutList_of_tasksInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutList_of_tasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskCreateWithoutSessionsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreatetaskIDsInputSchema: z.ZodType<Prisma.SessionCreatetaskIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const TaskUncheckedCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskCreateWithoutSessionsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskCreateWithoutSessionsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdatetaskIDsInputSchema: z.ZodType<Prisma.SessionUpdatetaskIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskCreateWithoutSessionsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskCreateWithoutTagsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreatetaskIDsInputSchema: z.ZodType<Prisma.TagCreatetaskIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const TaskUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskCreateWithoutTagsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumtagColorFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumtagColorFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => tagColorSchema).optional()
}).strict();

export const TaskUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskCreateWithoutTagsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdatetaskIDsInputSchema: z.ZodType<Prisma.TagUpdatetaskIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskCreateWithoutTagsInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TaskCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutConversationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutConversationsInputSchema),z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional()
}).strict();

export const ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumtaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumtaskStatusFilter> = z.object({
  equals: z.lazy(() => taskStatusSchema).optional(),
  in: z.lazy(() => taskStatusSchema).array().optional(),
  notIn: z.lazy(() => taskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => NestedEnumtaskStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumtaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumtaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => taskStatusSchema).optional(),
  in: z.lazy(() => taskStatusSchema).array().optional(),
  notIn: z.lazy(() => taskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => NestedEnumtaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtaskStatusFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumtagColorFilterSchema: z.ZodType<Prisma.NestedEnumtagColorFilter> = z.object({
  equals: z.lazy(() => tagColorSchema).optional(),
  in: z.lazy(() => tagColorSchema).array().optional(),
  notIn: z.lazy(() => tagColorSchema).array().optional(),
  not: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => NestedEnumtagColorFilterSchema) ]).optional(),
}).strict();

export const NestedEnumtagColorWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumtagColorWithAggregatesFilter> = z.object({
  equals: z.lazy(() => tagColorSchema).optional(),
  in: z.lazy(() => tagColorSchema).array().optional(),
  notIn: z.lazy(() => tagColorSchema).array().optional(),
  not: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => NestedEnumtagColorWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumtagColorFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumtagColorFilterSchema).optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  list_of_tasks: z.lazy(() => TaskCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  taskIDs: z.union([ z.lazy(() => SessionCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  list_of_tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const TaskCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutTasksInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTasksInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyUserInputSchema),z.lazy(() => TaskCreateManyUserInputSchema).array() ]),
}).strict();

export const ConversationCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManyUserInputSchema),z.lazy(() => ConversationCreateManyUserInputSchema).array() ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  focusDuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  breakDuration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedRounds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  in_progress: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutUserInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutUserInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumtaskStatusFilterSchema),z.lazy(() => taskStatusSchema) ]).optional(),
  tagIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  sessionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ConversationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ConversationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ConversationScalarWhereInputSchema: z.ZodType<Prisma.ConversationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const TagCreateWithoutTasksInputSchema: z.ZodType<Prisma.TagCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  tagDesc: z.string(),
  color: z.lazy(() => tagColorSchema)
}).strict();

export const TagUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => TagCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.string(),
  color: z.lazy(() => tagColorSchema)
}).strict();

export const TagCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const SessionCreateWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionCreateWithoutList_of_tasksInput> = z.object({
  id: z.string().optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutList_of_tasksInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  taskIDs: z.union([ z.lazy(() => SessionCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutList_of_tasksInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema) ]),
}).strict();

export const UserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TagUpsertWithWhereUniqueWithoutTasksInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutTasksInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutTasksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutTasksInputSchema),z.lazy(() => TagUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutTasksInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutTasksInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutTasksInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutTasksInputSchema) ]),
}).strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  tagDesc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => EnumtagColorFilterSchema),z.lazy(() => tagColorSchema) ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutList_of_tasksInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutList_of_tasksInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedCreateWithoutList_of_tasksInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutList_of_tasksInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutList_of_tasksInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutList_of_tasksInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutList_of_tasksInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutList_of_tasksInputSchema) ]),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const TaskCreateWithoutSessionsInputSchema: z.ZodType<Prisma.TaskCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema),
  tags: z.lazy(() => TagCreateNestedManyWithoutTasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTasksInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskUpsertWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutSessionsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const TaskCreateWithoutTagsInputSchema: z.ZodType<Prisma.TaskCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutList_of_tasksInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutTagsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const UserCreateWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConversationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]),
}).strict();

export const MessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyConversationInputSchema),z.lazy(() => MessageCreateManyConversationInputSchema).array() ]),
}).strict();

export const UserUpsertWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutConversationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConversationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema)
}).strict();

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutMessagesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversationsNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  taskIDs: z.union([ z.lazy(() => SessionCreatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.number().int(),
  breakDuration: z.number().int(),
  rounds: z.number().int(),
  completedRounds: z.number().int().optional(),
  endTime: z.coerce.date(),
  startTime: z.coerce.date().optional(),
  in_progress: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskCreateManyUserInputSchema: z.ZodType<Prisma.TaskCreateManyUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.lazy(() => taskStatusSchema).optional(),
  tagIDs: z.union([ z.lazy(() => TaskCreatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskCreatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationCreateManyUserInputSchema: z.ZodType<Prisma.ConversationCreateManyUserInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  list_of_tasks: z.lazy(() => TaskUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  list_of_tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTasksNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTasksNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUpdateWithoutTasksInputSchema: z.ZodType<Prisma.TagUpdateWithoutTasksInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutTasksInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => TagUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutTasksInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTasksInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => TagUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  tagDesc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => tagColorSchema),z.lazy(() => EnumtagColorFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUpdateWithoutList_of_tasksInput> = z.object({
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutList_of_tasksInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutList_of_tasksInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutList_of_tasksInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskIDs: z.union([ z.lazy(() => SessionUpdatetaskIDsInputSchema),z.string().array() ]).optional(),
  focusDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  breakDuration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedRounds: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  in_progress: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUpdateWithoutSessionsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutSessionsInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutSessionsInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TaskUpdateWithoutTagsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutTagsInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutList_of_tasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutTagsInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => taskStatusSchema),z.lazy(() => EnumtaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  tagIDs: z.union([ z.lazy(() => TaskUpdatetagIDsInputSchema),z.string().array() ]).optional(),
  sessionIDs: z.union([ z.lazy(() => TaskUpdatesessionIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyConversationInputSchema: z.ZodType<Prisma.MessageCreateManyConversationInput> = z.object({
  id: z.string().optional(),
  role: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutConversationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutConversationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const ConversationFindFirstArgsSchema: z.ZodType<Prisma.ConversationFindFirstArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindFirstOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindManyArgsSchema: z.ZodType<Prisma.ConversationFindManyArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationAggregateArgsSchema: z.ZodType<Prisma.ConversationAggregateArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationGroupByArgsSchema: z.ZodType<Prisma.ConversationGroupByArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithAggregationInputSchema.array(),ConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ConversationScalarFieldEnumSchema.array(),
  having: ConversationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationFindUniqueArgsSchema: z.ZodType<Prisma.ConversationFindUniqueArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindUniqueOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const PresetFindFirstArgsSchema: z.ZodType<Prisma.PresetFindFirstArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereInputSchema.optional(),
  orderBy: z.union([ PresetOrderByWithRelationInputSchema.array(),PresetOrderByWithRelationInputSchema ]).optional(),
  cursor: PresetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PresetScalarFieldEnumSchema,PresetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PresetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PresetFindFirstOrThrowArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereInputSchema.optional(),
  orderBy: z.union([ PresetOrderByWithRelationInputSchema.array(),PresetOrderByWithRelationInputSchema ]).optional(),
  cursor: PresetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PresetScalarFieldEnumSchema,PresetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PresetFindManyArgsSchema: z.ZodType<Prisma.PresetFindManyArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereInputSchema.optional(),
  orderBy: z.union([ PresetOrderByWithRelationInputSchema.array(),PresetOrderByWithRelationInputSchema ]).optional(),
  cursor: PresetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PresetScalarFieldEnumSchema,PresetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PresetAggregateArgsSchema: z.ZodType<Prisma.PresetAggregateArgs> = z.object({
  where: PresetWhereInputSchema.optional(),
  orderBy: z.union([ PresetOrderByWithRelationInputSchema.array(),PresetOrderByWithRelationInputSchema ]).optional(),
  cursor: PresetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PresetGroupByArgsSchema: z.ZodType<Prisma.PresetGroupByArgs> = z.object({
  where: PresetWhereInputSchema.optional(),
  orderBy: z.union([ PresetOrderByWithAggregationInputSchema.array(),PresetOrderByWithAggregationInputSchema ]).optional(),
  by: PresetScalarFieldEnumSchema.array(),
  having: PresetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PresetFindUniqueArgsSchema: z.ZodType<Prisma.PresetFindUniqueArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereUniqueInputSchema,
}).strict() ;

export const PresetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PresetFindUniqueOrThrowArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const ConversationCreateArgsSchema: z.ZodType<Prisma.ConversationCreateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
}).strict() ;

export const ConversationUpsertArgsSchema: z.ZodType<Prisma.ConversationUpsertArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
  create: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ConversationCreateManyArgsSchema: z.ZodType<Prisma.ConversationCreateManyArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema,ConversationCreateManyInputSchema.array() ]),
}).strict() ;

export const ConversationDeleteArgsSchema: z.ZodType<Prisma.ConversationDeleteArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateArgsSchema: z.ZodType<Prisma.ConversationUpdateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateManyArgsSchema: z.ZodType<Prisma.ConversationUpdateManyArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema,ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const ConversationDeleteManyArgsSchema: z.ZodType<Prisma.ConversationDeleteManyArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const PresetCreateArgsSchema: z.ZodType<Prisma.PresetCreateArgs> = z.object({
  select: PresetSelectSchema.optional(),
  data: z.union([ PresetCreateInputSchema,PresetUncheckedCreateInputSchema ]),
}).strict() ;

export const PresetUpsertArgsSchema: z.ZodType<Prisma.PresetUpsertArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereUniqueInputSchema,
  create: z.union([ PresetCreateInputSchema,PresetUncheckedCreateInputSchema ]),
  update: z.union([ PresetUpdateInputSchema,PresetUncheckedUpdateInputSchema ]),
}).strict() ;

export const PresetCreateManyArgsSchema: z.ZodType<Prisma.PresetCreateManyArgs> = z.object({
  data: z.union([ PresetCreateManyInputSchema,PresetCreateManyInputSchema.array() ]),
}).strict() ;

export const PresetDeleteArgsSchema: z.ZodType<Prisma.PresetDeleteArgs> = z.object({
  select: PresetSelectSchema.optional(),
  where: PresetWhereUniqueInputSchema,
}).strict() ;

export const PresetUpdateArgsSchema: z.ZodType<Prisma.PresetUpdateArgs> = z.object({
  select: PresetSelectSchema.optional(),
  data: z.union([ PresetUpdateInputSchema,PresetUncheckedUpdateInputSchema ]),
  where: PresetWhereUniqueInputSchema,
}).strict() ;

export const PresetUpdateManyArgsSchema: z.ZodType<Prisma.PresetUpdateManyArgs> = z.object({
  data: z.union([ PresetUpdateManyMutationInputSchema,PresetUncheckedUpdateManyInputSchema ]),
  where: PresetWhereInputSchema.optional(),
}).strict() ;

export const PresetDeleteManyArgsSchema: z.ZodType<Prisma.PresetDeleteManyArgs> = z.object({
  where: PresetWhereInputSchema.optional(),
}).strict() ;