const FormField = (labelText, formType, inputId) => {
  const field = document.createElement('div');
  field.className = "mb-3";

  const label = document.createElement('label');
  label.textContent = labelText;
  label.className = "form-label";

  const input = document.createElement('input');
  input.type = formType;
  input.className = "form-control";
  input.id = inputId;

  field.append(label, input);
  return field;
}

export default FormField;
