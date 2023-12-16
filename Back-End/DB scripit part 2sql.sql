use eventPlannerDB

create table Organizer
(
ID int              ,
Fname  nvarchar(50) not null,
Lname  nvarchar(50) not null, 
Phone int  not null, 
Email nvarchar (50) not null, 
Type nvarchar(50) ,
orgTeamID int , 

primary key (ID), 
foreign key (orgTeamID) references organizingTeam
ON DELETE cascade
ON UPDATE cascade ,

)

alter table organizingTeam add 

foreign key (leaderID) references Organizer
ON DELETE NO ACTION
ON UPDATE NO ACTION 

create table Work_On
(
taskID int              ,
organizerID int , 


primary key (taskID ,organizerID), 

foreign key (taskID) references Task
ON DELETE no action
ON UPDATE no action ,
foreign key (organizerID) references Organizer
ON DELETE no action
ON UPDATE no action
)

create table offerEvent
(
cordinatorID int ,
eventID  int  ,
sponsorName nvarchar(50) , 
/* status will be int 0 for rejected 1 for accepted */
status int check (status>=0 AND status<= 1) , 

primary key (cordinatorID, eventID ,sponsorName),

foreign key (cordinatorID) references Organizer
ON DELETE no action
ON UPDATE no action ,
foreign key (sponsorName) references Sponsor
ON DELETE no action
ON UPDATE no action ,
foreign key (eventID) references Event
ON DELETE no action
ON UPDATE no action 
)


