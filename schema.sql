CREATE TABLE todos (
    id SERIAL,
    todoitem VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE groceries (
    id SERIAL,
    groceryitem VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
)