const pool = require('../config/pool');

async function getAllSubjects() {
  const [rows] = await pool.query('SELECT * FROM subjects');
  return rows;
}

async function getSubjectById(id) {
  const [rows] = await pool.query('SELECT * FROM subjects WHERE id = ?', [id]);
  return rows[0] || null;
}

async function addSubject(subject) {
  const [result] = await pool.query(
    'INSERT INTO subjects (subject_code, subject_title, credit) VALUES (?, ?, ?)',
    [subject.code, subject.title, subject.credit]
  );
  if (result.insertId > 0) {
    console.log('Added successfully with id:', result.insertId);
  }
  return result;
}

async function updateSubject(id, subject) {
  const [result] = await pool.query(
    'UPDATE subjects SET subject_code = ?, subject_title = ?, credit = ? WHERE id = ?',
    [subject.code, subject.title, subject.credit, id]
  );
  if (result.affectedRows > 0) {
    console.log('Updated successfully');
  } else {
    console.log('No record updated');
  }
  return result;
}

async function removeSubject(id) {
  const [result] = await pool.query('DELETE FROM subjects WHERE id = ?', [id]);
  if (result.affectedRows > 0) {
    console.log(`Subject with id=${id} removed successfully`);
  } else {
    console.log(`No subject found with id=${id}`);
  }
  return result;
}


removeSubject(18)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// module.exports = {
//   getAllSubjects,
//   getSubjectById,
//   addSubject,
//   updateSubject,
//   removeSubject
// };
