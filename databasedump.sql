USE [Todo]
GO
/****** Object:  Table [dbo].[task]    Script Date: 6/7/2025 10:08:05 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[description] [text] NULL,
	[completed] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[task] ON 

INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (4, N'play cricket', N'playing with colleqes', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (5, N'drink tea', N'join teaparty', 1)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (6, N'Read a book', N'Read 20 pages of "Atomic Habits"', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (7, N'Submit assignment', N'Upload PDF of the essay before 11:59 PM', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (8, N'Attend team meeting', N'Join Zoom meeting with project team at 3 PM', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (9, N' Buy groceries	', N'Purchase milk, eggs, and bread from the supermarket ', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (10, N'Complete React project', N'Finish building the to-do app with backend integration', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (11, N'clean the house', N'mopping the house', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (12, N'call the doctor', N'Schedule a check-up appointment', 0)
INSERT [dbo].[task] ([id], [title], [description], [completed]) VALUES (13, N'sewing the clothes', N'design the clothes', 0)
SET IDENTITY_INSERT [dbo].[task] OFF
ALTER TABLE [dbo].[task] ADD  DEFAULT ((0)) FOR [completed]
GO
