--create database eventPlannerDB
Create database eventPlannerDB
GO
use eventPlannerDB

------------Table Creation-----------------


create table Venue
(
ID SERIAL PRIMARY KEY ,
Name  nvarchar(50) not null,
Location nvarchar(50) not null, 
Capacity int  not null, 
pricePerHour float not null, 

primary key (ID),

)




create table organizingTeam
(
ID SERIAL PRIMARY KEY ,
Name  varchar(50) not null,
hiringCost  int ,
Rate int ,

primary key (ID),

)



create table VenueReservation
(
ID int ,
Date date ,
stTime time , 
endTime time , 

primary key (ID ,Date ,stTime ,endTime),

foreign key (ID) references Venue 
ON DELETE cascade
ON UPDATE cascade ,

)



create table Event
(
    EventID SERIAL PRIMARY KEY,
Name varchar(50) not null,
Description varchar(50) ,
Date date ,
stTime time , 
endTime time , 
VenueID int ,
orgTeamID int ,

primary key (EventID),

foreign key (VenueID) references Venue 
ON DELETE set NULL
ON UPDATE cascade ,
foreign key (orgTeamID) references organizingTeam
ON DELETE set NULL
ON UPDATE cascade 

)

create table Expenses
(
eventID  int                   ,
itemName nvarchar(50) not null ,
Quantity int not NULL		   , 
Price	 int not NULL          ,
Description varchar(50) ,


primary key (eventID,itemName), 

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade 

)


create table Speaker
(
ID int              ,
Fname  nvarchar(50) not null,
Lname  nvarchar(50) not null, 
Phone int  not null, 
Email nvarchar (50) not null, 

primary key (ID), 
)

create table Agenda
(
eventID  int  ,
sessionID int ,
stTime time not null,
Duration int not null ,
Description nvarchar(50) ,
speakerID int ,

primary key (eventID,sessionID), 

foreign key (eventID) references Event
ON DELETE cascade  
ON UPDATE cascade ,

foreign key (speakerID) references Speaker
ON DELETE set null
ON UPDATE cascade 

)

create table Attendee
(
ID int              ,
Fname  nvarchar(50) not null,
Lname  nvarchar(50) not null, 
Phone int  not null, 
Email nvarchar (50) not null, 

primary key (ID), 
)



create table eventManager
(
ID int              ,
Fname  nvarchar(50) not null,
Lname  nvarchar(50) not null, 
Phone int  not null, 
Email nvarchar (50) not null, 

primary key (ID), 
)

create table Manages
(
eventID int , 
eventManagerID int , 

primary key (eventID ,eventManagerID),

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade ,
foreign key (eventManagerID) references eventManager
ON DELETE cascade
ON UPDATE cascade 

)

create table Hire
(
eventManagerID int , 
orgTeamID int , 
eventID  int  ,
budget int ,

primary key (eventManagerID , orgTeamID,eventID),

foreign key (orgTeamID) references organizingTeam
ON DELETE NO action
ON UPDATE NO action ,
foreign key (eventManagerID) references eventManager
ON DELETE NO action
ON UPDATE NO action,
foreign key (eventID) references Event
ON DELETE NO action
ON UPDATE NO action

)

create table Offer
(
speakerID int ,
eventManagerID int , 
eventID  int  ,
price int ,


primary key (speakerID ,eventManagerID),

foreign key (speakerID) references Speaker
ON DELETE cascade
ON UPDATE cascade ,
foreign key (eventManagerID) references eventManager
ON DELETE cascade
ON UPDATE cascade ,
foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade 
)



create table Company
(
ID int              ,
Fname  nvarchar(50) not null,
Lname  nvarchar(50) not null, 
Phone int  not null, 
Email nvarchar (50) not null, 

primary key (ID), 
)

create table companySpecialization
(
companyID int              ,
specializationName  nvarchar(50) ,

primary key (companyID ,specializationName) ,
foreign key (companyID) references Company
ON DELETE cascade
ON UPDATE cascade 

)


create table Sponsor
(

Name  nvarchar(50) ,
Phone int  not null, 
Email nvarchar (50) not null, 

primary key (Name), 
)

create table Fund
(

sponsorName  nvarchar(50) ,
eventID  int  ,
fundingMoney int not null, 

primary key (sponsorName ,eventID),

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade ,
foreign key (sponsorName) references Sponsor
ON DELETE cascade
ON UPDATE cascade 
)




create table speakerSpecialization
(
speakerID int              ,
specializationName  nvarchar(50) ,

primary key (speakerID,specializationName) ,
foreign key (speakerID) references Speaker
ON DELETE cascade
ON UPDATE cascade 

)

create table Recommend
(
speakerID int   ,
companyID  int ,
attendeeID int ,
/* status will be int 0 for rejected 1 for accepted */
status int check (status>=0 AND status<= 1) , 
primary key (companyID , speakerID , attendeeID) ,
foreign key (speakerID) references Speaker
ON DELETE cascade
ON UPDATE cascade ,
foreign key (companyID) references Company
ON DELETE cascade
ON UPDATE cascade ,
foreign key (attendeeID) references Attendee
ON DELETE cascade
ON UPDATE cascade 

)



create table Task
(
taskID int              ,
Description varchar(50) ,
Deadline date ,
Status nvarchar (50) ,
eventID  int                   ,


primary key (taskID), 

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade 

)

create table Registration
(
TicketID int , 
ticketPrice int not null ,
Type nvarchar (50) default 'ordinary',
seatNum int ,
attendeeID int not null ,
eventID int  not null, 

primary key (TicketID),

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade ,
foreign key (attendeeID) references Attendee
ON DELETE cascade
ON UPDATE cascade 

)




create table Review
(
eventID int  not null,
attendeeID int not null ,
Comment  nvarchar (50) , 
Rate int not null check(Rate>=0 AND Rate<= 5)  , 

primary key (eventID ,attendeeID),

foreign key (eventID) references Event
ON DELETE cascade
ON UPDATE cascade ,
foreign key (attendeeID) references Attendee
ON DELETE cascade
ON UPDATE cascade 

)

