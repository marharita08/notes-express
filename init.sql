create table if not exists categories (
    category_id serial primary key,
    category    varchar(100) not null
);

create table if not exists notes (
    note_id     serial primary key,
    name        varchar(300) not null,
    created     date not null,
    category_id int not null,
    content     text not null,
    dates       text,
    archived    boolean,
    foreign key (category_id) references categories (category_id)
);

CREATE OR REPLACE FUNCTION fill_categories()
RETURNS void AS $$
BEGIN
    DECLARE
        row_count integer;
    BEGIN

        SELECT COUNT(*) INTO row_count FROM categories;

        IF row_count = 0 THEN
            INSERT INTO categories (category)
            VALUES ('Task'),
            ('Idea'),
            ('Random Thought');
        END IF;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fill_notes()
RETURNS void AS $$
BEGIN
    DECLARE
        row_count integer;
    BEGIN

        SELECT COUNT(*) INTO row_count FROM notes;

        IF row_count = 0 THEN
            INSERT INTO notes (name, created, category_id, content, dates, archived)
            VALUES ('Buy Groceries', '2023-07-25', 1, 'Remember to buy groceries on 27.07.2023.', '27.07.2023', true),
            ('Invention Idea', '2023-07-27', 2, 'I had a brilliant invention idea!', null, false),
            ('Random Thought', '2023-07-28', 3, 'Life is full of surprises.', null, false),
            ('Prepare Meeting Report', '2023-07-28', 1, 'Finish the report for the meeting on 01.08.2023', '01.08.2023', false),
            ('Write Book', '2023-07-29', 2, 'Write a book about technology advancements.', null, true),
            ('Dentist Appointment', '2023-07-29', 1, 'I’m gonna have a dentist appointment on the 3/8/2023, I moved it from 5/8/2023.', '3/8/2023, 5/8/2023', false),
            ('Presentation Preparation', '2023-08-01', 2, 'Prepare for the upcoming presentation on 10.08.2023', '10.08.2023', false);
        END IF;
    END;
END;
$$ LANGUAGE plpgsql;

select fill_categories();
select fill_notes();
