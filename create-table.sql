CREATE TABLE if not exists coffee_brews (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brew_method VARCHAR2(255),
    bean_origin VARCHAR2(255),
    grind_size VARCHAR2(255),
    temperature NUMBER,
    brew_time NUMBER,
    notes VARCHAR2(4000),
    rating NUMBER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW coffee_brews_dv AS
coffee_brews @INSERT @UPDATE @DELETE{
  _id         : id,
  brew_method : brew_method,
  bean_origin : bean_origin,
  grind_size  : grind_size,
  temperature : temperature,
  brew_time   : brew_time,
  notes       : notes,
  rating      : rating,
  timestamp   : timestamp
};

--add the code to rest enable the DV
