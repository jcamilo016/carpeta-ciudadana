create table if not exists files
(
    id        varchar not null
        constraint key1
            primary key,
    data      bigint  not null,
    name      varchar not null,
    type      varchar not null,
    citizenid integer not null
);

create table if not exists citizen
(
    cid          integer not null
        constraint key2
            primary key,
    name         varchar not null,
    address      varchar not null,
    email        varchar not null,
    operatorid   integer not null,
    operatorname varchar not null,
    password     varchar not null
);