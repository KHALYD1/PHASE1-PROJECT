const apiUrl = 'https://api.alquran.cloud/v1';
const chapterList = document.getElementById('chapter-list');
const quranText = document.getElementById('quran-text');
const requestOptions = {
 
};

function fetchChapterList() {
  const url = `${apiUrl}/surah`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const chapters = data.data;
      chapters.forEach(chapter => {
        const link = document.createElement('a');
        // link.href = `#${chapter.number}`;
        link.innerText = `${chapter.number}. ${chapter.englishName} (${chapter.name})`;
        link.addEventListener('click',() => fetchQuranText(chapter.number)) 
        chapterList.appendChild(link);
      });
    })
    .catch(error => console.error(error));
}


function fetchQuranText(chapter) {

  console.log(chapter)
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://api.alquran.cloud/v1/quran/quran-uthmani ", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

fetchChapterList();



 