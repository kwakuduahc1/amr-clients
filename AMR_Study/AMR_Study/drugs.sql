USE [amr_db]
GO
/****** Object:  Table [dbo].[drugs]    Script Date: 19-Mar-24 08:57:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[drugs](
	[Generic_name] [nvarchar](100) NOT NULL,
	[Group] [nvarchar](50) NOT NULL,
	[column3] [tinyint] NULL
) ON [PRIMARY]
GO
