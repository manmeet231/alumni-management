// js/script.js
console.log("script.js is called")
const inputs = [
  'searchName', 'searchBatch', 'searchJob', 'searchLocation', 'searchBranch', 'searchCompany'
];

inputs.forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    filterUsers();
  });
});

function filterUsers() {
  const params = {
    name: document.getElementById('searchName').value,
    batch: document.getElementById('searchBatch').value,
    job_title: document.getElementById('searchJob').value,
    location: document.getElementById('searchLocation').value,
    branch: document.getElementById('searchBranch').value,
    company: document.getElementById('searchCompany').value
  };

  const query = new URLSearchParams(params).toString();

  fetch(`/directory/search?${query}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('alumniContainer').innerHTML = html;
    });
}
