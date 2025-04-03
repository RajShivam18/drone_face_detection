async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("http://localhost:5000/detect", {
      method: "POST",
      body: formData,
  });

  const result = await response.json();
  console.log("Detected Faces:", result.faces);
}

document.getElementById("video").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) uploadImage(file);
});
