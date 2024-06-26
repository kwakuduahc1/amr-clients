USE [master]
GO
/****** Object:  Database [amr_db]    Script Date: 28-Mar-24 00:43:12 ******/
CREATE DATABASE [amr_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'amr_db', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\amr_db.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'amr_db_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\amr_db_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [amr_db] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [amr_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [amr_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [amr_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [amr_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [amr_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [amr_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [amr_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [amr_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [amr_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [amr_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [amr_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [amr_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [amr_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [amr_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [amr_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [amr_db] SET  ENABLE_BROKER 
GO
ALTER DATABASE [amr_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [amr_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [amr_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [amr_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [amr_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [amr_db] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [amr_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [amr_db] SET RECOVERY FULL 
GO
ALTER DATABASE [amr_db] SET  MULTI_USER 
GO
ALTER DATABASE [amr_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [amr_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [amr_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [amr_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [amr_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [amr_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'amr_db', N'ON'
GO
ALTER DATABASE [amr_db] SET QUERY_STORE = ON
GO
ALTER DATABASE [amr_db] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [amr_db]
GO
/****** Object:  Table [dbo].[CultureAntibiotics]    Script Date: 28-Mar-24 00:43:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CultureAntibiotics](
	[CultureAntibioticsID] [int] IDENTITY(1,1) NOT NULL,
	[Antibiotic] [nvarchar](75) NOT NULL,
	[GroupName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CultureAntibiotics] PRIMARY KEY CLUSTERED 
(
	[CultureAntibioticsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hospitals]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hospitals](
	[HospitalsID] [smallint] IDENTITY(1,1) NOT NULL,
	[HospitalName] [nvarchar](100) NOT NULL,
	[Longitude] [decimal](22, 18) NOT NULL,
	[Latitude] [decimal](22, 18) NOT NULL,
	[Type] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_Hospitals] PRIMARY KEY CLUSTERED 
(
	[HospitalsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organisms]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organisms](
	[OrganismsID] [int] IDENTITY(1,1) NOT NULL,
	[Organism] [nvarchar](150) NOT NULL,
	[Type] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_Organisms] PRIMARY KEY CLUSTERED 
(
	[OrganismsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatientDetails]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatientDetails](
	[PatientDetailsID] [int] IDENTITY(1,1) NOT NULL,
	[HospitalsID] [smallint] NOT NULL,
	[Gender] [nvarchar](max) NOT NULL,
	[Age] [tinyint] NOT NULL,
	[PatientType] [nvarchar](3) NOT NULL,
	[LoS] [tinyint] NOT NULL,
	[Outcome] [nvarchar](max) NOT NULL,
	[DateAdded] [datetime2](7) NOT NULL,
	[DateDone] [datetime2](7) NOT NULL,
	[Concurrency] [timestamp] NULL,
	[FolderID] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_PatientDetails] PRIMARY KEY CLUSTERED 
(
	[PatientDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Diagnoses]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Diagnoses](
	[DiagnosesID] [int] IDENTITY(1,1) NOT NULL,
	[Diagnosis] [nvarchar](75) NOT NULL,
	[ICDCode] [nvarchar](75) NULL,
	[PatientDetailsID] [int] NULL,
 CONSTRAINT [PK_Diagnoses] PRIMARY KEY CLUSTERED 
(
	[DiagnosesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reports]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reports](
	[ReportsID] [int] IDENTITY(1,1) NOT NULL,
	[OrganismsID] [int] NOT NULL,
	[PatientDetailsID] [int] NOT NULL,
	[AntibioticsID] [int] NOT NULL,
	[Results] [nvarchar](15) NOT NULL,
 CONSTRAINT [PK_Reports] PRIMARY KEY CLUSTERED 
(
	[ReportsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[vwAntibiogramAll]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE       VIEW [dbo].[vwAntibiogramAll] as (
SELECT Organism, Antibiotic, Results, d.Diagnosis, h.HospitalsID, o.OrganismsID, h.HospitalName, DateAdded
FROM Reports r
inner join PatientDetails p on p.PatientDetailsID = r.PatientDetailsID
inner join Hospitals h on h.HospitalsID = p.HospitalsID
inner join Diagnoses d on d.PatientDetailsID = r.PatientDetailsID
inner join Organisms o on o.OrganismsID = r.OrganismsID
inner join CultureAntibiotics c on c.CultureAntibioticsID = r.AntibioticsID
)
GO
/****** Object:  UserDefinedFunction [dbo].[fnSensitivityByDiag]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fnSensitivityByDiag]
(	
	-- Add the parameters for the function here
	@diag varchar(100)
)
RETURNS TABLE 
AS
RETURN 
(
	with cte as (
SELECT        Organism, Antibiotic, Results, Count(Results) Number, HospitalName
FROM            vwAntibiogramAll
WHERE        (Diagnosis = @diag)
group by Organism, Antibiotic,HospitalName, Results
),
nums as (
select *, sum(number) over(partition by organism, antibiotic, hospitalname) Total
from cte
)
select Organism, Antibiotic, HospitalName, Total, cast(Number as decimal)/Total  [Score]
from nums
where Results = 'Sensitive'
)
GO
/****** Object:  UserDefinedFunction [dbo].[fnSensitivityByHosp]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fnSensitivityByHosp]
(	
	@hosp varchar(100)
)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	with cte as (
SELECT        Organism, Antibiotic, Results, Count(Results) Number
FROM            vwAntibiogramAll
WHERE        (HospitalName = @hosp)
group by Organism, Antibiotic,HospitalName, Results
),
nums as (
select *, sum(number) over(partition by organism, antibiotic) Total
from cte
)
select Organism, Antibiotic, Total, cast(Number as decimal)/Total  [Score]
from nums
where Results = 'Sensitive'
)
GO
/****** Object:  UserDefinedFunction [dbo].[fnSensitivityByDiagnosis]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fnSensitivityByDiagnosis] 
(	
	@diag varchar(100),
	@hosp int
)
RETURNS TABLE 
AS
RETURN 
(
	-- Add the SELECT statement with parameter references here
	with cte as (
SELECT        Organism, Results, COUNT(Results) AS Number
FROM            vwAntibiogramAll
WHERE        (Diagnosis = @diag) AND (HospitalsID = @hosp)
GROUP BY Organism, Results
),
nums as (
select *, sum(number) over(partition by organism) Total
from cte
)
select Organism, Total, cast(Number as decimal)/Total  [Score]
from nums
where Results = 'Sensitive'
)
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Antibiotics]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Antibiotics](
	[AntibioticsID] [int] IDENTITY(1,1) NOT NULL,
	[DrugName] [nvarchar](75) NOT NULL,
	[ActualName] [nvarchar](75) NULL,
	[DrugClass] [nvarchar](75) NULL,
	[PatientDetailsID] [int] NULL,
 CONSTRAINT [PK_Antibiotics] PRIMARY KEY CLUSTERED 
(
	[AntibioticsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nchar](36) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nchar](36) NOT NULL,
	[Discriminator] [nvarchar](21) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nchar](36) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nchar](36) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nchar](36) NOT NULL,
	[RoleId] [nchar](36) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nchar](36) NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[FullName] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](max) NOT NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nchar](36) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[drugs]    Script Date: 28-Mar-24 00:43:14 ******/
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
/****** Object:  Table [dbo].[Illnesses]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Illnesses](
	[IllnessesID] [int] IDENTITY(1,1) NOT NULL,
	[IllnessDate] [datetime2](7) NOT NULL,
	[DateAdded] [datetime2](7) NOT NULL,
	[Resolved] [bit] NOT NULL,
	[PatientDrugs] [nvarchar](max) NULL,
	[Symptoms] [nvarchar](max) NULL,
	[ParticipantsID] [int] NOT NULL,
	[UserName] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Illnesses] PRIMARY KEY CLUSTERED 
(
	[IllnessesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[myants]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[myants](
	[antibiotic] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Participants]    Script Date: 28-Mar-24 00:43:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Participants](
	[ParticipantID] [int] IDENTITY(1,1) NOT NULL,
	[ParticipantName] [nvarchar](75) NOT NULL,
	[Locality] [nvarchar](75) NOT NULL,
	[Age] [tinyint] NOT NULL,
	[Gender] [nvarchar](20) NOT NULL,
	[Longitude] [decimal](22, 16) NOT NULL,
	[Latitude] [decimal](22, 16) NOT NULL,
	[UserName] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Participants] PRIMARY KEY CLUSTERED 
(
	[ParticipantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Antibiotics_PatientDetailsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Antibiotics_PatientDetailsID] ON [dbo].[Antibiotics]
(
	[PatientDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Diagnoses_PatientDetailsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Diagnoses_PatientDetailsID] ON [dbo].[Diagnoses]
(
	[PatientDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Illnesses_ParticipantsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Illnesses_ParticipantsID] ON [dbo].[Illnesses]
(
	[ParticipantsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PatientDetails_HospitalsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_PatientDetails_HospitalsID] ON [dbo].[PatientDetails]
(
	[HospitalsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reports_AntibioticsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Reports_AntibioticsID] ON [dbo].[Reports]
(
	[AntibioticsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reports_OrganismsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Reports_OrganismsID] ON [dbo].[Reports]
(
	[OrganismsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reports_PatientDetailsID]    Script Date: 28-Mar-24 00:43:14 ******/
CREATE NONCLUSTERED INDEX [IX_Reports_PatientDetailsID] ON [dbo].[Reports]
(
	[PatientDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Illnesses] ADD  DEFAULT ((0)) FOR [ParticipantsID]
GO
ALTER TABLE [dbo].[Illnesses] ADD  DEFAULT (N'') FOR [UserName]
GO
ALTER TABLE [dbo].[Participants] ADD  DEFAULT (N'') FOR [UserName]
GO
ALTER TABLE [dbo].[PatientDetails] ADD  DEFAULT (N'') FOR [FolderID]
GO
ALTER TABLE [dbo].[Antibiotics]  WITH CHECK ADD  CONSTRAINT [FK_Antibiotics_PatientDetails_PatientDetailsID] FOREIGN KEY([PatientDetailsID])
REFERENCES [dbo].[PatientDetails] ([PatientDetailsID])
GO
ALTER TABLE [dbo].[Antibiotics] CHECK CONSTRAINT [FK_Antibiotics_PatientDetails_PatientDetailsID]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Diagnoses]  WITH CHECK ADD  CONSTRAINT [FK_Diagnoses_PatientDetails_PatientDetailsID] FOREIGN KEY([PatientDetailsID])
REFERENCES [dbo].[PatientDetails] ([PatientDetailsID])
GO
ALTER TABLE [dbo].[Diagnoses] CHECK CONSTRAINT [FK_Diagnoses_PatientDetails_PatientDetailsID]
GO
ALTER TABLE [dbo].[Illnesses]  WITH CHECK ADD  CONSTRAINT [FK_Illnesses_Participants_ParticipantsID] FOREIGN KEY([ParticipantsID])
REFERENCES [dbo].[Participants] ([ParticipantID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Illnesses] CHECK CONSTRAINT [FK_Illnesses_Participants_ParticipantsID]
GO
ALTER TABLE [dbo].[PatientDetails]  WITH CHECK ADD  CONSTRAINT [FK_PatientDetails_Hospitals_HospitalsID] FOREIGN KEY([HospitalsID])
REFERENCES [dbo].[Hospitals] ([HospitalsID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PatientDetails] CHECK CONSTRAINT [FK_PatientDetails_Hospitals_HospitalsID]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK_Reports_CultureAntibiotics_AntibioticsID] FOREIGN KEY([AntibioticsID])
REFERENCES [dbo].[CultureAntibiotics] ([CultureAntibioticsID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK_Reports_CultureAntibiotics_AntibioticsID]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK_Reports_Organisms_OrganismsID] FOREIGN KEY([OrganismsID])
REFERENCES [dbo].[Organisms] ([OrganismsID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK_Reports_Organisms_OrganismsID]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK_Reports_PatientDetails_PatientDetailsID] FOREIGN KEY([PatientDetailsID])
REFERENCES [dbo].[PatientDetails] ([PatientDetailsID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK_Reports_PatientDetails_PatientDetailsID]
GO
USE [master]
GO
ALTER DATABASE [amr_db] SET  READ_WRITE 
GO
