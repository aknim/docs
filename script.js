const documentContainer = document.querySelector('.document');

function addPage() {
    const newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.contentEditable = 'true';
    
    documentContainer.appendChild(newPage);
}

function checkOverflow() {
    const pages = document.querySelectorAll('.page');
    const lastPage = pages[pages.length - 1];

    if (lastPage.scrollHeight > lastPage.clientHeight) {
        addPage();
    }
}

documentContainer.addEventListener('input', checkOverflow);

function saveDocument() {
    console.log("hi");
    const pages = document.querySelectorAll('.page');
    const pageContents = Array.from(pages).map(page => page.innerHTML);
    const documentData = JSON.stringify(pageContents);

    localStorage.setItem('documentContent', documentData);
    alert('Document saved!');
}

function loadDocument() {
    const savedContent = localStorage.getItem('documentContent');
    if (savedContent) {
        const pageContents = JSON.parse(savedContent);

        // Clear existing content
        documentContainer.innerHTML = '';

        // Recreate pages with saved content
        pageContents.forEach(content => {
            const newPage = document.createElement('div');
            newPage.className = 'page';
            newPage.contentEditable = 'true';
            newPage.innerHTML = content;
            documentContainer.appendChild(newPage);
        });
    } else {
        addPage(); 
    }
}

document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent browser's default behavior
        saveDocument(); 
    }
})

// Initial Setup
loadDocument();
