async function loadSample() {
    const selectedSample = document.getElementById('samplePrograms').value;
    if (selectedSample) {
        try {
            const response = await fetch(`samples/${selectedSample}.js`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const sampleCode = await response.text();
            editor.setValue(sampleCode);
        } catch (error) {
            console.error('Error fetching the sample code:', error);
            editor.setValue('Error loading sample code.');
        }
    }
}

function runCode() {
    const code = editor.getValue();
    const outputElement = document.getElementById('output');
    outputElement.textContent = ''; // Clear previous output
    
    // Save the original console.log
    const originalConsoleLog = console.log;

    // Override console.log
    console.log = (...args) => {
        // Convert all arguments to strings and concatenate them
        const output = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
        // Display the output in the outputElement and also add a newline for each call
        outputElement.textContent += output + '\n';
    };

    try {
        eval(code);
    } catch (e) {
        outputElement.textContent = `${e.name}: ${e.message}`;
    } finally {
        // Restore the original console.log
        console.log = originalConsoleLog;
    }
}

function save(string, type, file) {
    const text = eval(string);
    const blob = new Blob([text], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            editor.setValue(e.target.result);
        };
        reader.readAsText(file);
    }
}

var editor = CodeMirror.fromTextArea(document.getElementById('codeInput'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'base16-light',
});

function toggleEditorTheme() {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
        editor.setOption('theme', 'base16-dark');
    } else {
        editor.setOption('theme', 'base16-light');
    }
}

function toggleLogoTheme() {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
        document.getElementById('logo').src="image.png";
    } else {
        document.getElementById('logo').src="logo.png";
    }
}

window.addEventListener('beforeunload', function (e) {
    const confirmationMessage = 'Are you sure you want to leave this page? Any unsaved changes will be lost.';
    e.returnValue = confirmationMessage; // Standard for most browsers
    return confirmationMessage; // Required for some older browsers
});