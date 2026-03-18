const express = require("express");
const app = express();

app.use(express.json());

// ================= TEACHER API =================
let teachers = [
  { id: 1, name: "Sok", subject: "Math" },
  { id: 2, name: "Vanna", subject: "English" },
];

// ✅ GET all teachers
app.get("/teachers", (req, res) => {
  res.json({
    message: "Get all teachers",
    data: teachers,
  });
});

// ✅ POST create teacher
app.post("/teachers", (req, res) => {
  const { name, subject } = req.body;

  if (!name || !subject) {
    return res.status(400).json({
      message: "Name and subject are required",
    });
  }

  const newTeacher = {
    id: teachers.length + 1,
    name,
    subject,
  };

  teachers.push(newTeacher);

  res.status(201).json({
    message: "Teacher created",
    data: newTeacher,
  });
});

// ✅ PUT update teacher
app.put("/teachers", (req, res) => {
  const { id, name, subject } = req.body;

  const teacher = teachers.find((t) => t.id === id);

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found",
    });
  }

  teacher.name = name ?? teacher.name;
  teacher.subject = subject ?? teacher.subject;

  res.json({
    message: "Teacher updated",
    data: teacher,
  });
});

// ✅ DELETE teacher
app.delete("/teachers", (req, res) => {
  const { id } = req.body;

  const index = teachers.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Teacher not found",
    });
  }

  const deleted = teachers.splice(index, 1);

  res.json({
    message: "Teacher deleted",
    data: deleted[0],
  });
});

// ✅ START SERVER (ONLY ONCE)
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
