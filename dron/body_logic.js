document.addEventListener('DOMContentLoaded', () => {
  const faceList = document.getElementById('faceList');
  const detectedFaces = [
      { name: 'John Doe', id: 'A123', timestamp: '12:05 PM' },
      { name: 'Jane Smith', id: 'B456', timestamp: '12:07 PM' },
      { name: 'Alice Johnson', id: 'C789', timestamp: '12:10 PM' }
  ];
  
  detectedFaces.forEach(face => {
      let li = document.createElement('li');
      li.innerHTML = `👤 <strong>${face.name}</strong> | ID: ${face.id} | ⏰ ${face.timestamp}`;
      faceList.appendChild(li);
  });
});

function filterResults() {
  let input = document.getElementById('searchBox').value.toLowerCase();
  let faceList = document.getElementById('faceList').getElementsByTagName('li');
  
  for (let i = 0; i < faceList.length; i++) {
      let text = faceList[i].textContent.toLowerCase();
      faceList[i].style.display = text.includes(input) ? '' : 'none';
  }
}