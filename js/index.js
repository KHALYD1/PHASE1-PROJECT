const apiUrl = 'https://api.alquran.cloud/v1';
const chapterList = document.getElementById('chapter-list');
const quranText = document.getElementById('quran-text');
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function fetchChapterList() {
  const url = `${apiUrl}/surah`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const chapters = data.data;
      chapters.forEach(chapter => {
        const link = document.createElement('a');
        link.href = `#${chapter.number}`;
        link.innerText = `${chapter.number}. ${chapter.englishName} (${chapter.name})`;
        link.onclick = () => fetchQuranText(chapter.number);
        chapterList.appendChild(link);
      });
    })
    .catch(error => console.error(error));
}

function fetchQuranText(chapter) {
  const url = `${apiUrl}/surah/${chapter}/en.asad,ar.alafasy`;

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const verses = data.data.ayahs;
      let quranText = '';
      verses.forEach(verse => {
        quranText += `${verse.text} (${verse.numberInSurah})<br>`;
      });
      quranText = `<h2>${data.data.englishName} (${data.data.name})</h2>${quranText}`;
      quranText = quranText.replaceAll('<p>', '').replaceAll('</p>', ''); // remove <p> tags from the text
      quranText = quranText.replaceAll('<br>', '<br><br>'); // add some spacing between verses
      quranText = quranText.replaceAll('    ', '&nbsp;&nbsp;&nbsp;&nbsp;'); // replace spaces with non-breaking spaces for indentation
      quranText = quranText.trim(); // remove leading/trailing white space
      quranText = `<div class="quran-chapter">${quranText}</div>`;
      quranText.scrollTop = 0; // scroll to the top of the chapter
      quranText.innerHTML = quranText;
    })
    .catch(error => console.error(error));
}

fetchChapterList(); // fetch the list of chapters on page load
