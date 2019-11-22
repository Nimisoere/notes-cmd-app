const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your Notes"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  if (notes.length > filteredNotes.length) {
    saveNotes(filteredNotes);
    console.log(chalk.green.inverse(`Remove note with title ${title}`));
  } else {
    console.log(chalk.red.inverse(`Count not find note with title ${title}`));
  }
};

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note){
        console.log(chalk.green.inverse(note.title));
        console.log(note.body)
    } else{
        console.log(chalk.red.inverse(`Count not find note with title ${title}`));
    }
};

module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote
};
