// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the root element to add new HTML elements
  var root = document.getElementById("root");

  // Create textarea element
  var textarea = document.createElement("textarea");
  textarea.id = "inputText";
  textarea.placeholder = "Enter text here";

  // Add a line break element
  var lineBreak = document.createElement("br");

  // Create submit button element
  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.id = "submitBtn";

  // Append the textarea and button to the root element
  root.appendChild(textarea);
  root.appendChild(lineBreak);
  root.appendChild(submitButton);

  // Add an event listener to the button
  submitButton.addEventListener("click", function () {
    // Get the value of the textarea
    var inputText = textarea.value;

    // Function to process text
    processText(inputText);
  });
});

function processText(text) {
  // Split the text into words using white space as the delimiter
  const words = text.split(/\s+/);

  //Object to count the frequency of each word
  const frequency = {};

  words.forEach(function (word) {
    // Skip empty strings
    if (word === "") return;

    // Convert word to lower
    word = word.toLowerCase();

    // If the word has already been counted, increment count, otherwise initialize it to 1
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Frequency object to the console
  console.log(frequency);

  // Update the UI with a table of word frequencies
  updateUIWithFrequencyTable(frequency);
}

function updateUIWithFrequencyTable(frequency) {
  // Convert the frequency object to an array and sort by frequency
  const sortedFrequencyArray = Object.keys(frequency).map((key) => ({
    word: key,
    count: frequency[key],
  }));
  sortedFrequencyArray.sort((a, b) => b.count - a.count);

  // Slice the array to get the top 5 items
  const top5 = sortedFrequencyArray.slice(0, 5);

  // Create a table element
  var table = document.createElement("table");

  // Create a header row
  var headerRow = table.insertRow();
  var wordHeader = headerRow.insertCell();
  wordHeader.textContent = "Word";
  var countHeader = headerRow.insertCell();
  countHeader.textContent = "Count";

  // Add a row to the table for each of the top 5 words
  top5.forEach(function (entry) {
    var row = table.insertRow();
    var wordCell = row.insertCell();
    wordCell.textContent = entry.word;
    var countCell = row.insertCell();
    countCell.textContent = entry.count;
  });

  // Append the table to the root element
  var root = document.getElementById("root");
  var existingTable = root.querySelector("table");
  if (existingTable) {
    root.replaceChild(table, existingTable);
  } else {
    root.appendChild(table);
  }
}
