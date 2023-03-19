import { JOB_ROUTE } from "../config.js";
import Fetcher from "../fetcher.js";
import { fileToDataUrl, getElem, linkBtnToModal } from "../helpers.js";
import FormField from "./form_field.js";

const hydration = (form, id) => {
  getElem('new-post-submit-btn', form).addEventListener('click', () => {
    const title = getElem('new-post-title', form).value;
    const image = getElem('new-post-image', form).files[0];
    const desc = getElem('new-post-description', form).value;

    const date = getElem('new-post-date', form).value;
    const time = getElem('new-post-time', form).value;
    const datetime = `${date}T${time}:00.000Z`;

    let fetcher = Fetcher.post(JOB_ROUTE);
    let payload = {
      "title": title,
      "start": datetime,
      "description": desc,
    }

    if (typeof id !== 'undefined') {
      fetcher = Fetcher.put(JOB_ROUTE);
      payload = {
        ...payload,
        "id": id,
      }
    }

    try {
      fileToDataUrl(image)
        .then(data => {
          payload = {
            ...payload,
            "image": data,
          }

          const result = fetcher.withLocalStorageToken().withJsonPayload(payload).fetchResult();
          result.then(data => {
              if (data.error) {
                alert(data.error);
              }
            });
        });
    } catch (e) {
      alert(e);
      console.log(e);
    }
    
  });
}

const NewPostForm = (id=undefined) => {
  const form = document.createElement('form');

  const titleField = FormField("Job Title", "text", "new-post-title");
  const imageField = FormField("Job Image", "file", "new-post-image");
  const dateField = FormField("Job Start Date", "date", "new-post-date");
  const timeField = FormField("Job Start At", "time", "new-post-time");
  
  const descField = document.createElement('div');
  descField.className = "mb-3";

  const descLabel = document.createElement('label');
  descLabel.className = "form-label";
  descLabel.textContent = "Job Description";

  const descInput = document.createElement('textarea');
  descInput.className = "form-control";
  descInput.rows = 3;
  descInput.id = "new-post-description";

  descField.append(descLabel, descInput);

  const submitBtn = document.createElement('button');
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-primary";
  submitBtn.textContent = typeof id === 'undefined' ? "Post" : "Edit";
  submitBtn.id = "new-post-submit-btn";
  linkBtnToModal(submitBtn, "placeholder-modal");

  form.append(
    titleField,
    imageField,
    dateField,
    timeField,
    descField,
    submitBtn
  );

  hydration(form, id);
  return form;
}

export default NewPostForm;
