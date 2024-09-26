CREATE TABLE FieldValidations (
  id SERIAL PRIMARY KEY,
  field_name VARCHAR(50) NOT NULL,
  entity_name VARCHAR(50) NOT NULL,
  is_required BOOLEAN NOT NULL,
  regex_pattern VARCHAR(255),
  min_length INTEGER,
  max_length INTEGER,
  field_type VARCHAR(50) NOT NULL -- Tipo de campo (string, number, etc.)
);


INSERT INTO FieldValidations (field_name, entity_name, is_required, regex_pattern, min_length, max_length, field_type)
VALUES
  ('name', 'Persona', true, null, 2, 50, 'string'),
  ('dni', 'Persona', true, '^[A-Z0-9]{10}$', null, null, 'string'),
  ('lastname', 'Persona', true, null, 2, 50, 'string'),
  ('age', 'Persona', true, null, null, null, 'number');
  
 
 CREATE TABLE WorkflowTask (
  id SERIAL PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  nextStep VARCHAR(255),
  descripcionStep VARCHAR(255), -- Campo para la descripción con códigos
  conditions JSONB
);

INSERT INTO WorkflowTask (taskName, status, nextStep, descripcionStep, conditions)
VALUES
  -- 1. Asignación inicial de membresía
  ('Tarea 1', 'pending', 'ASSN001-240926', 'ASSN001-240926: Asignación de membresía creada el 26 de septiembre de 2024', '{"condition": "none"}'),

  -- 2. Revisión de solicitud de membresía
  ('Tarea 2', 'pending', 'REV001-240927', 'REV001-240927: Revisión de solicitud de membresía creada el 27 de septiembre de 2024', '{"condition": "ASSN001-240926 completed"}'),

  -- 3. Aprobación de la solicitud de membresía
  ('Tarea 3', 'pending', 'APP001-240928', 'APP001-240928: Aprobación de la membresía creada el 28 de septiembre de 2024', '{"condition": "REV001-240927 completed"}'),

  -- 4. Recepción del pago de membresía
  ('Tarea 4', 'pending', 'PAY001-240929', 'PAY001-240929: Recepción del pago de membresía creada el 29 de septiembre de 2024', '{"condition": "APP001-240928 approved"}'),

  -- 5. Envío de la membresía
  ('Tarea 5', 'pending', 'SEND001-240930', 'SEND001-240930: Envío de la membresía creada el 30 de septiembre de 2024', '{"condition": "PAY001-240929 received"}'),

  -- 6. Rechazo de la solicitud (opción alternativa)
  ('Tarea 6', 'pending', 'RJCT001-240927', 'RJCT001-240927: Rechazo de la membresía creado el 27 de septiembre de 2024', '{"condition": "REV001-240927 rejected"}'),

  -- 7. Finalización del proceso de membresía
  ('Tarea 7', 'pending', NULL, 'COMPL001-241001: Proceso de membresía completado el 1 de octubre de 2024', '{"condition": "SEND001-240930 completed or RJCT001-240927 rejected"}');

-- Mostrar las tareas insertadas
SELECT * FROM WorkflowTask;