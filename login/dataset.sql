CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

create table if not exists nodelogin.accounts(
    id varchar(55) primary key,
    passwd varchar(256) not null
);

insert into nodelogin.accounts values('kgh', 'ssd');
commit;
