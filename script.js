const savedChapters = [];
let currentChapterIndex = null;

document.getElementById('saveButton').addEventListener('click', function() {
    const chapterTitle = document.getElementById('chapterTitle').value;
    const storyInput = document.getElementById('storyInput').value;

    if (chapterTitle && storyInput) {
        savedChapters.push({ title: chapterTitle, content: storyInput });
        displayChapters();
        document.getElementById('chapterTitle').value = '';
        document.getElementById('storyInput').value = '';
    } else {
        alert('Bitte Titel und Inhalt eingeben!');
    }
});

function displayChapters() {
    const savedChaptersDiv = document.getElementById('savedChapters');
    savedChaptersDiv.innerHTML = '';

    savedChapters.forEach((chapter, index) => {
        const chapterElement = document.createElement('div');
        chapterElement.innerHTML = `<strong>${chapter.title}</strong> <button onclick="editChapter(${index})">Bearbeiten</button>`;
        savedChaptersDiv.appendChild(chapterElement);
    });
}

function editChapter(index) {
    const chapter = savedChapters[index];
    document.getElementById('chapterTitle').value = chapter.title;
    document.getElementById('storyInput').value = chapter.content;
    currentChapterIndex = index;
}

document.getElementById('previewButton').addEventListener('click', function() {
    const previewContainer = document.getElementById('previewContainer');
    const previewContent = document.getElementById('previewContent');
    const storyContent = document.getElementById('storyInput').value;

    previewContent.innerHTML = '';
    const lines = storyContent.split('\n');
    lines.forEach((line, index) => {
        previewContent.innerHTML += `<p>${line}</p>`;
        if ((index + 1) % 5 === 0) {
            const bubble = document.createElement('div');
            bubble.classList.add('comment-bubble');
            bubble.textContent = 'Kommentar hinzufügen';
            bubble.onclick = () => addComment(index);
            previewContent.appendChild(bubble);
        }
    });

    document.getElementById('savedChapters').style.display = 'none';
    previewContainer.classList.remove('hidden');
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('previewContainer').classList.add('hidden');
    document.getElementById('savedChapters').style.display = 'block';
});

function addComment(lineIndex) {
    const comment = prompt("Gib deinen Kommentar ein:");
    if (comment) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');
        commentContainer.textContent = `Kommentar zu Zeile ${lineIndex + 1}: ${comment}`;
        document.getElementById('previewContent').appendChild(commentContainer);
    }
}